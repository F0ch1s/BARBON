import React from 'react';
import Modal from '../ui/Modal';
import { addProduct } from '../../stores/inventoryStore';
import type { Product, Unit } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: crypto.randomUUID(),
      code: formData.get('code') as string,
      description: formData.get('description') as string,
      width: formData.get('width') as string,
      color: formData.get('color') as string,
      unit: formData.get('unit') as Unit,
      cost: parseFloat(formData.get('cost') as string) || 0,
    };

    if (addProduct(newProduct)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Nueva Cinta">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              placeholder="Ej: Rojo Pasión"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold opacity-70">Descripción / Material</label>
          <input
            name="description"
            required
            className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            placeholder="Ej: Cinta Satín 25mm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Ancho</label>
            <input
              name="width"
              required
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
              placeholder='Ej: 25mm o 1"'
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Unidad de Medida</label>
            <select name="unit" className="border-b-2 border-[#141414] py-2 focus:outline-none bg-white">
              <option value="Rollos">Rollos</option>
              <option value="Metros">Metros</option>
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
          className="bg-[#141414] text-white py-4 mt-4 font-bold hover:bg-[#141414]/90 transition-colors uppercase tracking-widest text-sm"
        >
          Guardar en Catálogo
        </button>
      </form>
    </Modal>
  );
}
