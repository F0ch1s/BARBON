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
 * Genera un código automático con prefijo MB (Muebles ).
 * Busca el siguiente número secuencial disponible.
 * Ejemplo: MB-001, MB-002, MB-003, etc.
 */
function generateCode(description: string, existingProducts: Product[]): string {
  if (!description.trim()) return '';

  const prefix = 'MB';

  // Buscar todos los códigos existentes que empiecen con MB-
  const usedNumbers = existingProducts
    .filter(p => p.code.startsWith(prefix + '-'))
    .map(p => {
      // Extraer la parte numérica después de "MB-"
      const match = p.code.match(/^MB-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => !isNaN(n));

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
      category: formData.get('category') as string,
      material: formData.get('material') as string,
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Registrar Nuevo Mueble">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
<<<<<<< HEAD
=======
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Código de Producto</label>
            <input
              name="code"
              required
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
              placeholder="Ej: SAT-001"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Color</label>
            <input
              name="color"
              required
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
              placeholder="Ej: Rojo"
            />
          </div>
        </div>
>>>>>>> 7747453 (cambio de color)
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold opacity-70">Nombre del Mueble</label>
          <input
            name="description"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            placeholder="Ej: Ropero 4 puertas, Escritorio ejecutivo"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Código (automático)</label>
            <div className="border-b-2 border-[#141414]/30 py-2 text-sm font-mono tracking-wider bg-slate-50 px-1 text-[#141414]/80 min-h-[2rem] flex items-center">
              {autoCode || <span className="text-[#141414]/30 italic text-xs">Escribe el nombre...</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Material</label>
            <input
              name="material"
              required
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
              placeholder="Ej: Madera de pino, MDF, Melamina"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Categoría</label>
            <select name="category" required className="border-b-2 border-[#141414] py-2 focus:outline-none bg-white">
              <option value="">Seleccionar...</option>
              <option value="Dormitorio">Dormitorio</option>
              <option value="Oficina">Oficina</option>
              <option value="Cocina">Cocina</option>
              <option value="Sala">Sala</option>
              <option value="Comedor">Comedor</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Unidad de Medida</label>
            <select name="unit" className="border-b-2 border-[#141414] py-2 focus:outline-none bg-white">
              <option value="Unidades">Unidades</option>
              <option value="Juegos">Juegos</option>
              <option value="Piezas">Piezas</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold opacity-70">Costo Unitario</label>
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