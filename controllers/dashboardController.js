const pool = require('../db/conexion');

// Mostrar todos los usuarios
exports.menuDashboard = (req, res) => {
  res.render("dashboard");
};

// Mostrar la Consulta # 9
exports.librosBaratosCortos = async (req, res) => {
  try {
    const [libros] = await pool.query(
      `SELECT 'Precio Mínimo' AS Segun_Criterio_Min, titulo, precio, paginas, dibujos
       FROM libros
       WHERE precio = (SELECT MIN(precio) FROM libros)
       UNION ALL

       SELECT 'Páginas Mínimas' AS Segun_Criterio_Min, titulo, precio, paginas, dibujos
       FROM libros
       WHERE paginas = (SELECT MIN(paginas) FROM libros)
       UNION ALL

       SELECT 'Dibujos Mínimos' AS Segun_Criterio_Min, titulo, precio, paginas, dibujos
       FROM libros
       WHERE dibujos = (SELECT MIN(dibujos) FROM libros)
       LIMIT 3;`
    );

    if (Array.isArray(libros)) {
      res.render('librosBaratosCortos', { libros });
    } else {
      console.error('No se obtuvo un array de libros');
      res.status(500).send('Error al obtener los libros');
    }
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).send('Error al obtener los libros');
  }
};

// Controlador para obtener los alquileres por mes y generar el gráfico
exports.graficoAlquileresPorMes = async (req, res) => {
  try {
    const [resultados] = await pool.query(
      `SELECT 
        YEAR(p.fecha_prestamo) AS anio,
        MONTH(p.fecha_prestamo) AS mes,
        COUNT(*) AS cantidad_prestamos
      FROM prestamos p
      GROUP BY anio, mes
      ORDER BY anio ASC, mes ASC;`
    );
    

    // Reorganizar datos si es necesario para el gráfico (opcional según tu vista)
    res.render('graficoMensual', { resultados });

  } catch (error) {
    console.error('Error al obtener los alquileres por mes:', error);
    res.status(500).send('Error al obtener los alquileres por mes');
  }
};


