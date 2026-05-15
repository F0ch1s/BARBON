import React from 'react';
import Modal from '../ui/Modal';
import { updateProduct } from '../../stores/inventoryStore';
import type { Product, Unit } from '../../types';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function EditProductModal({ isOpen, onClose, product }: EditProductModalProps) {
  if (!product) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProduct: Product = {
      ...product,
      code: formData.get('code') as string,
      description: formData.get('description') as string,
      width: formData.get('width') as string,
      color: formData.get('color') as string,
      unit: formData.get('unit') as Unit,
      cost: parseFloat(formData.get('cost') as string) || 0,
    };

    if (await updateProduct(updatedProduct)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Código de Producto</label>
            <input
              name="code"
              required
              defaultValue={product.code}
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Color</label>
            <input
              name="color"
              required
              defaultValue={product.color}
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold opacity-70">Descripción / Material</label>
          <input
            name="description"
            required
            defaultValue={product.description}
            className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Ancho</label>
            <input
              name="width"
              required
              defaultValue={product.width}
              className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-70">Unidad de Medida</label>
            <select
              name="unit"
              defaultValue={product.unit}
              className="border-b-2 border-[#141414] py-2 focus:outline-none bg-white"
            >
              <option value="Cajas">Cajas</option>
              <option value="Yardas">Yardas</option>
              <option value="Unidades">Unidades</option>
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
            defaultValue={product.cost}
            className="border-b-2 border-[#141414] py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700">
          <strong>Nota:</strong> Para ajustar el stock, registra un movimiento de Entrada o Salida en la pestaña "Movimientos".
        </div>

        <button
          type="submit"
          className="bg-[#141414] text-white py-4 mt-2 font-bold hover:bg-[#141414]/90 transition-colors uppercase tracking-widest text-sm"
        >
          Guardar Cambios
        </button>
      </form>
    </Modal>
  );
}
