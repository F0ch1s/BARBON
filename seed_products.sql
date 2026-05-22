-- =============================================
-- DISTRIBUCIONES DYNO - Reinsertar productos con stock
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- PASO 1: Limpiar datos existentes
DELETE FROM movements;
DELETE FROM products;

-- PASO 2: Actualizar la restricción de unidad
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_unit_check;
ALTER TABLE products ADD CONSTRAINT products_unit_check
  CHECK (unit IN ('Cajas', 'Yardas', 'Unidades'));

-- PASO 3: Insertar productos del cliente
INSERT INTO products (code, description, category, material, unit, cost) VALUES
  ('DY-014', 'Cinta Dyn', '14 yardas', 'Estándar', 'Cajas', 150.00),
  ('DY-016', 'Cinta Dyn', '16 yardas', 'Estándar', 'Cajas', 70.00),
  ('DY-018', 'Cinta Dyn', '18 yardas', 'Estándar', 'Cajas', 80.00),
  ('DY-036', 'Cinta Dyn', '36 yardas', 'Estándar', 'Cajas', 264.00),
  ('DY-070', 'Cinta Dyn', '70 yardas', 'Estándar', 'Cajas', 220.00),
  ('DY-080', 'Cinta Dyn', '80 yardas', 'Estándar', 'Cajas', 240.00),
  ('DY-090', 'Cinta Dyn', '90 yardas', 'Estándar', 'Cajas', 260.00),
  ('DY-100', 'Cinta Dyn', '100 yardas', 'Estándar', 'Cajas', 300.00),
  ('DY-320', 'Cinta Dyn', '320 yardas', 'Estándar', 'Cajas', 240.00),
  ('DY-340', 'Cinta Dyn', '340 yardas', 'Estándar', 'Cajas', 260.00),
  ('DY-080-BLA', 'Cinta Dyn', '80 yardas', 'Blanco', 'Cajas', 240.00),
  ('DY-080-NEG', 'Cinta Dyn', '80 yardas', 'Negro', 'Cajas', 240.00),
  ('DY-080-VER', 'Cinta Dyn', '80 yardas', 'Verde', 'Cajas', 240.00),
  ('DY-080-AMA', 'Cinta Dyn', '80 yardas', 'Amarillo', 'Cajas', 240.00),
  ('DY-080-NAR', 'Cinta Dyn', '80 yardas', 'Anaranjado', 'Cajas', 240.00),
  ('DY-080-AZU', 'Cinta Dyn', '80 yardas', 'Azul', 'Cajas', 240.00),
  ('DY-080-ROJ', 'Cinta Dyn', '80 yardas', 'Rojo', 'Cajas', 240.00);

-- PASO 4: Insertar movimientos de STOCK INICIAL (entradas)
INSERT INTO movements (product_id, type, quantity, cost, notes)
SELECT id, 'IN', 253, 150.00, 'Stock inicial' FROM products WHERE code = 'DY-014'
UNION ALL
SELECT id, 'IN', 274, 70.00, 'Stock inicial' FROM products WHERE code = 'DY-016'
UNION ALL
SELECT id, 'IN', 254, 80.00, 'Stock inicial' FROM products WHERE code = 'DY-018'
UNION ALL
SELECT id, 'IN', 245, 264.00, 'Stock inicial' FROM products WHERE code = 'DY-036'
UNION ALL
SELECT id, 'IN', 235, 220.00, 'Stock inicial' FROM products WHERE code = 'DY-070'
UNION ALL
SELECT id, 'IN', 214, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080'
UNION ALL
SELECT id, 'IN', 245, 260.00, 'Stock inicial' FROM products WHERE code = 'DY-090'
UNION ALL
SELECT id, 'IN', 285, 300.00, 'Stock inicial' FROM products WHERE code = 'DY-100'
UNION ALL
SELECT id, 'IN', 257, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-320'
UNION ALL
SELECT id, 'IN', 296, 260.00, 'Stock inicial' FROM products WHERE code = 'DY-340'
UNION ALL
SELECT id, 'IN', 120, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-BLA'
UNION ALL
SELECT id, 'IN', 95, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-NEG'
UNION ALL
SELECT id, 'IN', 85, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-VER'
UNION ALL
SELECT id, 'IN', 93, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-AMA'
UNION ALL
SELECT id, 'IN', 97, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-NAR'
UNION ALL
SELECT id, 'IN', 102, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-AZU'
UNION ALL
SELECT id, 'IN', 118, 240.00, 'Stock inicial' FROM products WHERE code = 'DY-080-ROJ';

-- PASO 5: Insertar ENTRADAS adicionales
INSERT INTO movements (product_id, type, quantity, cost, notes)
SELECT id, 'IN', 10, 80.00, 'Entrada adicional' FROM products WHERE code = 'DY-018';

-- PASO 6: Insertar SALIDAS
INSERT INTO movements (product_id, type, quantity, cost, notes)
SELECT id, 'OUT', 200, 80.00, 'Salida de mercadería' FROM products WHERE code = 'DY-018'
UNION ALL
SELECT id, 'OUT', 230, 260.00, 'Salida de mercadería' FROM products WHERE code = 'DY-340';
