import { useStore } from '@nanostores/react';
import { motion } from 'motion/react';
import { $products, $movements } from '../stores/inventoryStore';
import { getProductSalesRanking, getTotalEntryCost, getTotalExitCost, calculateStats } from '../lib/calculations';
import ReportCard from './ui/ReportCard';

export default function Reports() {
  const products = useStore($products);
  const movements = useStore($movements);
  const stats = calculateStats(products, movements);

  const topSellers = getProductSalesRanking(products, movements, 'desc', 5);
  const lowSellers = getProductSalesRanking(products, movements, 'asc', 5);
  const totalEntries = getTotalEntryCost(movements);
  const totalExits = getTotalExitCost(movements);

  return (
    <motion.div
      key="reports"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <ReportCard title="Top 5 - Más Vendidos" description="Productos con mayor rotación de stock (Salidas)">
        <div className="flex flex-col gap-4">
          {topSellers.map((p, idx) => (
            <div key={p.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-serif italic text-gray-200">#0{idx + 1}</span>
                <div>
                  <div className="font-bold text-sm">{p.description}</div>
                  <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">{p.code}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-green-600">+{p.sales}</div>
                <div className="text-[10px] opacity-40 uppercase">{p.unit}</div>
              </div>
            </div>
          ))}
          {topSellers.length === 0 && (
            <p className="text-center opacity-30 italic py-4">Sin datos de ventas</p>
          )}
        </div>
      </ReportCard>

      <ReportCard title="Top 5 - Menos Vendidos" description="Productos con baja rotación en el periodo">
        <div className="flex flex-col gap-4">
          {lowSellers.map((p, idx) => (
            <div key={p.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-serif italic text-gray-200">#0{idx + 1}</span>
                <div>
                  <div className="font-bold text-sm">{p.description}</div>
                  <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">{p.code}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-orange-600">+{p.sales}</div>
                <div className="text-[10px] opacity-40 uppercase">{p.unit}</div>
              </div>
            </div>
          ))}
          {lowSellers.length === 0 && (
            <p className="text-center opacity-30 italic py-4">Sin datos de ventas</p>
          )}
        </div>
      </ReportCard>

      {/* Economic Summary */}
      <div className="md:col-span-2 bg-white border border-[#141414] p-8">
        <h3 className="text-2xl font-serif italic mb-6">Resumen Económico del Inventario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="border-l-2 border-[#141414] pl-6">
            <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-1">Costo Total de Entradas</div>
            <div className="text-3xl font-mono">${totalEntries.toLocaleString()}</div>
          </div>
          <div className="border-l-2 border-[#141414] pl-6">
            <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-1">Ingresos por Salidas (Costo)</div>
            <div className="text-3xl font-mono">${totalExits.toLocaleString()}</div>
          </div>
          <div className="border-l-2 border-[#141414] pl-6">
            <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-1">Valor en Almacén Actual</div>
            <div className="text-3xl font-mono text-blue-600">${stats.totalValue.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
