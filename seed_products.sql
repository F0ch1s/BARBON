-- =============================================
-- DISTRIBUCIONES DYNO - Productos de ejemplo
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- PASO 1: Actualizar la restricción de unidad para permitir nuevos valores
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_unit_check;
ALTER TABLE products ADD CONSTRAINT products_unit_check
  CHECK (unit IN ('Yardas', 'Metros', 'Rollos', 'Unidades', 'Piezas', 'Cajas', 'Paquetes'));

-- PASO 2: Insertar productos de ejemplo
INSERT INTO products (code, description, width, color, unit, cost) VALUES
  -- Cintas (se miden en yardas)
  ('CIN-001', 'Cinta Satín', '25mm', 'Rojo', 'Yardas', 0.80),
  ('CIN-002', 'Cinta Satín', '25mm', 'Blanco', 'Yardas', 0.80),
  ('CIN-003', 'Cinta Satín', '10mm', 'Negro', 'Yardas', 0.50),
  ('CIN-004', 'Cinta Grosgrain', '15mm', 'Azul Marino', 'Yardas', 1.20),
  ('CIN-005', 'Cinta Organza', '25mm', 'Dorado', 'Yardas', 1.50),
  ('CIN-006', 'Cinta de Raso', '50mm', 'Rosa', 'Yardas', 1.80),
  ('CIN-007', 'Cinta Decorativa Navideña', '40mm', 'Rojo/Verde', 'Yardas', 2.50),
  ('CIN-008', 'Cinta Floral Estampada', '25mm', 'Multicolor', 'Yardas', 2.00),

  -- Cintas adhesivas (se miden en rollos)
  ('CIN-009', 'Cinta Masking Tape', '24mm', 'Beige', 'Rollos', 3.50),
  ('CIN-010', 'Cinta Embalaje Transparente', '48mm', 'Transparente', 'Rollos', 4.00),
  ('CIN-011', 'Cinta Aislante Eléctrica', '19mm', 'Negro', 'Rollos', 2.80),
  ('CIN-012', 'Cinta Doble Contacto', '12mm', 'Blanco', 'Rollos', 5.50),

  -- Listones y lazos (en yardas)
  ('LIS-001', 'Listón de Terciopelo', '25mm', 'Vino', 'Yardas', 3.00),
  ('LIS-002', 'Listón Metálico', '15mm', 'Plateado', 'Yardas', 2.20),
  ('LIS-003', 'Lazo Pre-armado Grande', '80mm', 'Dorado', 'Unidades', 4.50),

  -- Telas y materiales (en metros)
  ('TEL-001', 'Tul Decorativo', '1.50m', 'Blanco', 'Metros', 6.00),
  ('TEL-002', 'Manta Polar', '1.50m', 'Azul', 'Metros', 12.00),

  -- Accesorios (en unidades/paquetes)
  ('ACC-001', 'Tijeras para Cinta', 'N/A', 'Plateado', 'Unidades', 15.00),
  ('ACC-002', 'Dispensador de Cinta', 'N/A', 'Negro', 'Unidades', 25.00);
