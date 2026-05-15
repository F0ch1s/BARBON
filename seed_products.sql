-- =============================================
-- DISTRIBUCIONES DYNO - Productos de ejemplo
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- PASO 1: Actualizar la restricción de unidad para permitir nuevos valores
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_unit_check;
ALTER TABLE products ADD CONSTRAINT products_unit_check
  CHECK (unit IN ('Cajas', 'Yardas', 'Unidades'));

-- PASO 2: Limpiar productos anteriores (si existen)
DELETE FROM movements; -- Borrar movimientos primero por la foreign key
DELETE FROM products;

-- PASO 3: Insertar productos del cliente
INSERT INTO products (code, description, width, color, unit, cost) VALUES
  -- Cinta Dynox por yardaje
  ('DY-014', 'Cinta Dynox', '14 yardas', 'Estándar', 'Cajas', 150.00),
  ('DY-016', 'Cinta Dynox', '16 yardas', 'Estándar', 'Cajas', 70.00),
  ('DY-018', 'Cinta Dynox', '18 yardas', 'Estándar', 'Cajas', 80.00),
  ('DY-036', 'Cinta Dynox', '36 yardas', 'Estándar', 'Cajas', 264.00),
  ('DY-070', 'Cinta Dynox', '70 yardas', 'Estándar', 'Cajas', 220.00),
  ('DY-080', 'Cinta Dynox', '80 yardas', 'Estándar', 'Cajas', 240.00),
  ('DY-090', 'Cinta Dynox', '90 yardas', 'Estándar', 'Cajas', 260.00),
  ('DY-100', 'Cinta Dynox', '100 yardas', 'Estándar', 'Cajas', 300.00),
  ('DY-320', 'Cinta Dynox', '320 yardas', 'Estándar', 'Cajas', 240.00),
  ('DY-340', 'Cinta Dynox', '340 yardas', 'Estándar', 'Cajas', 260.00),

  -- Cinta Dynox 80 yd por color
  ('DY-080-BLA', 'Cinta Dynox 80 yd', '80 yardas', 'Blanco', 'Cajas', 240.00),
  ('DY-080-NEG', 'Cinta Dynox 80 yd', '80 yardas', 'Negro', 'Cajas', 240.00),
  ('DY-080-VER', 'Cinta Dynox 80 yd', '80 yardas', 'Verde', 'Cajas', 240.00),
  ('DY-080-AMA', 'Cinta Dynox 80 yd', '80 yardas', 'Amarillo', 'Cajas', 240.00),
  ('DY-080-NAR', 'Cinta Dynox 80 yd', '80 yardas', 'Anaranjado', 'Cajas', 240.00),
  ('DY-080-AZU', 'Cinta Dynox 80 yd', '80 yardas', 'Azul', 'Cajas', 240.00),
  ('DY-080-ROJ', 'Cinta Dynox 80 yd', '80 yardas', 'Rojo', 'Cajas', 240.00);
