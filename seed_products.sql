-- =============================================
-- MUEBLERÍA BARBÓN - Productos de ejemplo
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- PASO 1: Limpiar datos anteriores PRIMERO (antes de cambiar constraints)
DELETE FROM movements; -- Borrar movimientos primero por la foreign key
DELETE FROM products;

-- PASO 2: Renombrar columnas de width/color a category/material
ALTER TABLE products RENAME COLUMN width TO category;
ALTER TABLE products RENAME COLUMN color TO material;

-- PASO 3: Actualizar la restricción de unidad para los nuevos valores
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_unit_check;
ALTER TABLE products ADD CONSTRAINT products_unit_check
  CHECK (unit IN ('Unidades', 'Juegos', 'Piezas'));

-- PASO 4: Insertar productos de mueblería
INSERT INTO products (code, description, category, material, unit, cost) VALUES
  -- Muebles de Dormitorio
  ('MB-001', 'Cama King Size con cabecera tapizada', 'Dormitorio', 'Madera de pino', 'Unidades', 2800.00),
  ('MB-002', 'Cama Queen Size clásica', 'Dormitorio', 'MDF enchapado', 'Unidades', 1950.00),
  ('MB-003', 'Velador 2 cajones', 'Dormitorio', 'Melamina', 'Unidades', 280.00),
  ('MB-004', 'Cómoda 6 cajones', 'Dormitorio', 'Madera de cedro', 'Unidades', 1200.00),
  ('MB-005', 'Ropero 4 puertas con espejo', 'Dormitorio', 'MDF', 'Unidades', 2400.00),
  ('MB-006', 'Tocador con espejo y banco', 'Dormitorio', 'Madera de pino', 'Juegos', 950.00),

  -- Muebles de Oficina
  ('MB-007', 'Escritorio ejecutivo en L', 'Oficina', 'Melamina', 'Unidades', 1100.00),
  ('MB-008', 'Silla ergonómica giratoria', 'Oficina', 'Metal y malla', 'Unidades', 650.00),
  ('MB-009', 'Estante archivador 5 niveles', 'Oficina', 'Metal', 'Unidades', 420.00),
  ('MB-010', 'Mesa de reuniones 8 personas', 'Oficina', 'MDF enchapado', 'Unidades', 1800.00),
  ('MB-011', 'Librero modular 4 cuerpos', 'Oficina', 'Melamina', 'Unidades', 780.00),

  -- Muebles de Cocina
  ('MB-012', 'Repostero alto 3 puertas', 'Cocina', 'Melamina', 'Unidades', 850.00),
  ('MB-013', 'Repostero bajo con granito', 'Cocina', 'MDF y granito', 'Unidades', 1400.00),
  ('MB-014', 'Mesa de cocina 4 personas', 'Cocina', 'Madera de pino', 'Unidades', 520.00),
  ('MB-015', 'Alacena rústica 2 puertas', 'Cocina', 'Madera reciclada', 'Unidades', 680.00),

  -- Muebles de Sala
  ('MB-016', 'Sofá seccional en L 5 asientos', 'Sala', 'Tela y madera', 'Unidades', 3200.00),
  ('MB-017', 'Mesa de centro con vidrio', 'Sala', 'Vidrio y metal', 'Unidades', 450.00),
  ('MB-018', 'Mueble para TV 55 pulgadas', 'Sala', 'Melamina', 'Unidades', 680.00),

  -- Muebles de Comedor
  ('MB-019', 'Juego de comedor 6 sillas', 'Comedor', 'Madera de cedro', 'Juegos', 2600.00),
  ('MB-020', 'Vitrina aparador con vidrio', 'Comedor', 'MDF y vidrio', 'Unidades', 1350.00);
