import * as XLSX from 'xlsx';
import type { Product, Movement } from '../types';
import { calculateStock } from './calculations';

/**
 * Import products from an Excel file
 */
export function parseExcelFile(binaryString: string): Product[] {
  const wb = XLSX.read(binaryString, { type: 'binary' });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[];

  return data
    .map(
      (item): Product => ({
        id: crypto.randomUUID(),
        code: String(item.Codigo || item.CODE || ''),
        description: String(item.Descripcion || item.DESCRIPTION || ''),
        width: String(item.Ancho || item.WIDTH || ''),
        color: String(item.Color || item.COLOR || ''),
        unit: (item.Unidad || item.UNIT) === 'Metros' ? 'Metros' : 'Rollos',
        cost: parseFloat(String(item.Costo || item.COST)) || 0,
      })
    )
    .filter(p => p.code && p.description);
}

/**
 * Export inventory data to Excel file
 */
export function exportInventoryToExcel(products: Product[], movements: Movement[]) {
  const exportData = products.map(p => ({
    Codigo: p.code,
    Descripcion: p.description,
    Ancho: p.width,
    Color: p.color,
    Unidad: p.unit,
    Costo: p.cost,
    Stock: calculateStock(p.id, movements),
    ValorTotal: calculateStock(p.id, movements) * p.cost,
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inventario');
  XLSX.writeFile(wb, `Inventario_Kardex_${new Date().toLocaleDateString()}.xlsx`);
}
