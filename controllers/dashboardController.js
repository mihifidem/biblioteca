const pool = require('../db/conexion');

// Mostrar todos los usuarios
exports.menuDashboard = (req, res) => {
  res.render("dashboard"); // ✅ nombre correcto de la vista
};
 exports.buenoBonitoBaratoDashboard = async (req, res) =>{
  const [libros] = await pool.query(`select *
from libros
where precio = (select min(precio) from libros)
UNION
select *
from libros
where paginas = (select min(paginas) from libros)
UNION
select *
from libros
where dibujos = (select min(dibujos) from libros);`)

 res.render("libros",{libros,autores:[], editoriales:[]}); 
  };
// Mostrar los prestamos más antiguos
exports.pendientesAntiguosDashboard = async (req, res) => {
  const [prestamos] = await pool.query(`
    SELECT p.*, u.nombre AS usuario, b.titulo AS libro 
    from prestamos p
    join usuarios u
    on p.usuario_id = u.id
    join libros b
    on p.libro_id = b.id
    where p.fecha_devolucion IS NULL
    order by p.fecha_prestamo DESC`);
   const [usuarios] = await pool.query('SELECT * FROM usuarios');
   const [libros] = await pool.query('SELECT * FROM libros');
   const botones = false;
   const titulo_listado = "Prestamos Pendientes de Devolución";
  res.render("prestamos",{prestamos, usuarios, libros,botones, titulo_listado}); // ✅ nombre correcto de la vista
};

exports.graficoMensualDashboard = async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT
        YEAR(p.fecha_prestamo) AS anio,
        MONTH(p.fecha_prestamo) AS mes,
        COUNT(*) AS cantidad_prestamos
      FROM prestamos p
      GROUP BY anio, mes
      ORDER BY anio ASC, mes ASC;`
    );
   

    res.render('graficoMensual', { results });

  } catch (error) {
    console.error('Error al obtener los alquileres por mes:', error);
    res.status(500).send('Error al obtener los alquileres por mes');
  } 
};
// Mostrar prestamos por autor
exports.prestamosAutorDashboard = async (req, res) => {
  const [prestamos] = await pool.query(`
    SELECT count(l.titulo) as total, a.nombre
    from libros l
    join prestamos p
    on p.libro_id = l.id
    join autores a
    on l.autor_id = a.id
    group by a.nombre
    order by count(l.titulo) DESC`);
   
  res.render("prestamos_autor",{prestamos}); // ✅ nombre correcto de la vista
};

// Mostrar prestamos por autor
exports.categoriaGeneroDashboard = async (req, res) => {
  const [results] = await pool.query(`
    SELECT *
FROM (
  SELECT u.genero as genero, c.categoria as categoria, COUNT(*) AS Total
  FROM prestamos p
  JOIN usuarios u ON u.id = p.usuario_id
  JOIN libros l ON l.id = p.libro_id
  JOIN categorias_libros c ON l.id_categoria = c.id
  WHERE u.genero = 'H'
  GROUP BY u.genero, c.categoria
  ORDER BY Total DESC
  LIMIT 1
) AS top_h

UNION

-- Subconsulta para género 'M'
SELECT *
FROM (
  SELECT u.genero as genero, c.categoria as categoria, COUNT(*) AS Total
  FROM prestamos p
  JOIN usuarios u ON u.id = p.usuario_id
  JOIN libros l ON l.id = p.libro_id
  JOIN categorias_libros c ON l.id_categoria = c.id
  WHERE u.genero = 'M'
  GROUP BY u.genero, c.categoria
  ORDER BY Total DESC
  LIMIT 1
) AS top_m;`);
   
  res.render("categoria_genero",{results}); // 
};
