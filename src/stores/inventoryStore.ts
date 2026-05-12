import { atom } from 'nanostores';
import type { Product, Movement, Notification } from '../types';

const STORAGE_KEY_PRODUCTS = 'kardex_products';
const STORAGE_KEY_MOVEMENTS = 'kardex_movements';

// --- Atoms ---
export const $products = atom<Product[]>([]);
export const $movements = atom<Movement[]>([]);
export const $notifications = atom<Notification[]>([]);

// --- Persistence: Load from localStorage ---
export function loadFromStorage() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    const savedMovements = localStorage.getItem(STORAGE_KEY_MOVEMENTS);
    if (savedProducts) $products.set(JSON.parse(savedProducts));
    if (savedMovements) $movements.set(JSON.parse(savedMovements));
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
}

// --- Persistence: Save to localStorage ---
function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
}

function saveMovements(movements: Movement[]) {
  localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(movements));
}

// --- Product Actions ---
export function addProduct(product: Product): boolean {
  const current = $products.get();
  if (current.some(p => p.code === product.code)) {
    addNotification('El código de producto ya existe', 'error');
    return false;
  }
  const updated = [...current, product];
  $products.set(updated);
  saveProducts(updated);
  addNotification('Producto añadido correctamente', 'success');
  return true;
}

export function deleteProduct(id: string): boolean {
  const movements = $movements.get();
  if (movements.some(m => m.productId === id)) {
    addNotification('No se puede eliminar un producto con movimientos registrados', 'error');
    return false;
  }
  const updated = $products.get().filter(p => p.id !== id);
  $products.set(updated);
  saveProducts(updated);
  addNotification('Producto eliminado', 'success');
  return true;
}

export function importProducts(newProducts: Product[]): number {
  const current = $products.get();
  const unique = newProducts.filter(np => !current.some(p => p.code === np.code));
  const updated = [...current, ...unique];
  $products.set(updated);
  saveProducts(updated);
  addNotification(`Importados ${unique.length} productos nuevos`, 'success');
  return unique.length;
}

// --- Movement Actions ---
export function addMovement(movement: Movement): boolean {
  if (movement.type === 'OUT') {
    const currentStock = getStock(movement.productId);
    if (currentStock < movement.quantity) {
      addNotification('Stock insuficiente para esta salida', 'error');
      return false;
    }
  }
  const updated = [...$movements.get(), movement];
  $movements.set(updated);
  saveMovements(updated);
  addNotification('Movimiento registrado', 'success');
  return true;
}

// --- Stock Calculation ---
export function getStock(productId: string): number {
  const movements = $movements.get();
  return movements
    .filter(m => m.productId === productId)
    .reduce((acc, m) => (m.type === 'IN' ? acc + m.quantity : acc - m.quantity), 0);
}

// --- Notification Actions ---
export function addNotification(message: string, type: 'success' | 'error') {
  const id = Date.now();
  const current = $notifications.get();
  $notifications.set([...current, { id, message, type }]);
  setTimeout(() => {
    $notifications.set($notifications.get().filter(n => n.id !== id));
  }, 3000);
}
