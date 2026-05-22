import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'motion/react';
import { Search, Plus, Trash2, Pencil } from 'lucide-react';
import { $products, $movements, getStock, deleteProduct } from '../stores/inventoryStore';
import { $settings, formatMoney } from '../stores/settingsStore';
import { filterProducts } from '../lib/calculations';
import ProductModal from './modals/ProductModal';
import EditProductModal from './modals/EditProductModal';
import type { Product } from '../types';

export default function ProductsTable() {
  const products = useStore($products);
  const movements = useStore($movements);
  const settings = useStore($settings);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = filterProducts(products, searchTerm);

  return (
    <motion.div
      key="products"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre, código, categoría o material..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#141414] text-sm focus:outline-none focus:ring-1 focus:ring-[#141414]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto bg-[#141414] text-white px-6 py-2 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Nuevo Mueble
        </button>
      </div>

      <div className="bg-white border border-[#141414] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#141414] text-white text-xs uppercase font-mono">
                <th className={settings.compactTables ? 'p-3' : 'p-4'}>Código</th>
                <th className={settings.compactTables ? 'p-3' : 'p-4'}>Descripción</th>
                <th className={settings.compactTables ? 'p-3' : 'p-4'}>Categoría</th>
                <th className={settings.compactTables ? 'p-3' : 'p-4'}>Material</th>
                <th className={`${settings.compactTables ? 'p-3' : 'p-4'} text-right`}>Stock</th>
                <th className={`${settings.compactTables ? 'p-3' : 'p-4'} text-right`}>Costo</th>
                <th className={`${settings.compactTables ? 'p-3' : 'p-4'} text-center`}>Acciones</th>
              </tr>
            </thead>
            <tbody className={`font-mono ${settings.compactTables ? 'text-xs' : 'text-sm'}`}>
              {filtered.map(p => {
                const stock = getStock(p.id);
                const isLowStock = stock < settings.lowStockThreshold;
                return (
                <tr key={p.id} className={`border-b border-[#141414] transition-colors ${isLowStock ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-gray-50'}`}>
                  <td className={`font-bold ${settings.compactTables ? 'p-3' : 'p-4'} ${isLowStock ? 'text-red-700' : ''}`}>{p.code}</td>
                  <td className={`${settings.compactTables ? 'p-3' : 'p-4'} ${isLowStock ? 'text-red-700' : ''}`}>{p.description}</td>
                  <td className={`${settings.compactTables ? 'p-3' : 'p-4'}`}>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold">
                      {p.category}
                    </span>
                  </td>
                  <td className={`${settings.compactTables ? 'p-3' : 'p-4'} ${isLowStock ? 'text-red-700' : ''}`}>{p.material}</td>
                  <td className={`${settings.compactTables ? 'p-3' : 'p-4'} text-right`}>
                    <span className={isLowStock ? 'text-red-700 font-bold' : ''}>
                      {stock} {p.unit}
                    </span>
                    {isLowStock && (
                      <div className="text-[10px] text-red-600 font-semibold mt-0.5">⚠ STOCK BAJO</div>
                    )}
                  </td>
                  <td className={`${settings.compactTables ? 'p-3' : 'p-4'} text-right`}>{formatMoney(p.cost, settings.currency)}</td>
                  <td className={`${settings.compactTables ? 'p-3' : 'p-4'} text-center`}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Editar producto"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center opacity-30 italic">
                    {searchTerm ? 'No se encontraron muebles' : 'No hay muebles registrados'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <EditProductModal
        isOpen={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
      />
    </motion.div>
  );
}
