const pool = require('../db/conexion');

// Mostrar todos los usuarios
exports.menuDashboard = (req, res) => {
  res.render("dashboard"); // ✅ nombre correcto de la vista
};

// Mostrar la Consulta 9
exports.librosBaratosCortos = async (req, res) => {
  try {
    // Realizar la consulta SQL
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

    // Asegurarse de que 'libros' sea un array
    if (Array.isArray(libros)) {
      res.render('librosBaratosCortos', { libros });
    } else {
      console.error('No se obtuvo un array de libros');
      res.status(500).send('Error al obtener los libros');
    }
  } catch (error) {
    // En caso de error, loguear y mostrar un mensaje de error
    console.error('Error al obtener los libros:', error);
    res.status(500).send('Error al obtener los libros');
  }
};
