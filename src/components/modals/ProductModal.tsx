import React, { useState, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import Modal from '../ui/Modal';
import { addProduct, $products } from '../../stores/inventoryStore';
import type { Product, Unit } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Genera un código automático basado en la descripción.
 * Toma las primeras 3 letras de la primera palabra significativa,
 * luego busca el siguiente número secuencial disponible.
 * Ejemplo: "Tubo PVC" → TUB-001, TUB-002, etc.
 */
function generateCode(description: string, existingProducts: Product[]): string {
  if (!description.trim()) return '';

  // Palabras a ignorar para generar el prefijo
  const stopWords = ['de', 'del', 'la', 'el', 'en', 'los', 'las', 'un', 'una', 'y', 'para', 'con', 'por'];

  const words = description
    .trim()
    .split(/\s+/)
    .filter(w => !stopWords.includes(w.toLowerCase()));

  // Tomar las primeras 3 letras de la primera palabra significativa
  const prefix = (words[0] || description.trim())
    .replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ]/g, '')
    .substring(0, 3)
    .toUpperCase()
    // Normalizar acentos para el código
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!prefix) return '';

  // Contar productos existentes con el mismo prefijo
  const existingWithPrefix = existingProducts.filter(p =>
    p.code.startsWith(prefix + '-')
  );

  // Encontrar el siguiente número disponible
  const usedNumbers = existingWithPrefix.map(p => {
    const num = parseInt(p.code.split('-')[1], 10);
    return isNaN(num) ? 0 : num;
  });

  const nextNum = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 1;

  return `${prefix}-${String(nextNum).padStart(3, '0')}`;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const products = useStore($products);
  const [description, setDescription] = useState('');

  const autoCode = useMemo(() => generateCode(description, products), [description, products]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: crypto.randomUUID(),
      code: autoCode,
      description: description,
      width: formData.get('width') as string,
      color: formData.get('color') as string,
      unit: formData.get('unit') as Unit,
      cost: parseFloat(formData.get('cost') as string) || 0,
    };

    if (await addProduct(newProduct)) {
      setDescription('');
      onClose();
    }
  };

  // Reset description when modal closes
  const handleClose = () => {
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Registrar Nuevo Producto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold opacity-70">Descripción / Material</label>
          <input
            name="description"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            placeholder="Ej: Tubo PVC 1/2 pulgada"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Código (automático)</label>
            <div className="border-b-2 border-[#141414]/30 py-2 text-sm font-mono tracking-wider bg-slate-50 px-1 text-[#141414]/80 min-h-[2rem] flex items-center">
              {autoCode || <span className="text-[#141414]/30 italic text-xs">Escribe la descripción...</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Color</label>
            <input
              name="color"
              required
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
              placeholder="Ej: Negro"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Ancho</label>
            <input
              name="width"
              required
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
              placeholder='Ej: 1/2" o 50mm'
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Unidad de Medida</label>
            <select name="unit" className="border-b-2 border-[#141414] py-2 focus:outline-none bg-white">
              <option value="Yardas">Yardas</option>
              <option value="Metros">Metros</option>
              <option value="Rollos">Rollos</option>
              <option value="Unidades">Unidades</option>
              <option value="Piezas">Piezas</option>
              <option value="Cajas">Cajas</option>
              <option value="Paquetes">Paquetes</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold opacity-70">Costo Unitario (USD)</label>
          <input
            name="cost"
            type="number"
            step="0.01"
            required
            className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            placeholder="0.00"
          />
        </div>
        <button
          type="submit"
          disabled={!autoCode}
          className="bg-[#141414] text-white py-4 mt-4 font-bold hover:bg-[#141414]/90 transition-colors uppercase tracking-widest text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Guardar en Catálogo
        </button>
      </form>
    </Modal>
  );
}
