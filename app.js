const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const usuariosRoutes = require('./routes/usuariosRoutes');
const librosRoutes = require('./routes/librosRoutes');
const autoresRoutes = require('./routes/autoresRoutes');
const editorialesRoutes = require('./routes/editorialesRoutes');
const prestamosRoutes = require('./routes/prestamosRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('index'); // Usa index.ejs
});
app.use('/usuarios', usuariosRoutes);
app.use('/libros', librosRoutes);
app.use('/autores', autoresRoutes);
app.use('/editoriales', editorialesRoutes);
app.use('/prestamos', prestamosRoutes);
app.use('/empleados', empleadosRoutes);

app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});
