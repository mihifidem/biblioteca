const pool = require('../db/conexion');

// Mostrar todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  const [usuarios] = await pool.query('SELECT * FROM usuarios');
  res.render('usuarios', { usuarios , usuario:{}, action:'/usuarios/crear'});
};

// Crear usuario nuevo
exports.createUsuario = async (req, res) => {
  const { nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo } = req.body;
  
  await pool.query(
    `INSERT INTO usuarios (nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo]
  );

  res.redirect('/usuarios');
};


// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  res.redirect('/usuarios');
};
// editar usuario
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  res.render('usuarios',{usuarios:{},usuario: result[0], action:`/usuarios/actualizar/${id}`})
};

// editar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo } = req.body;

  await pool.query(
    `UPDATE usuarios 
     SET nombre=?, email=?, telefono=?, direccion=?, CP=?, poblacion=?, provincia=?, estado_civil=?, sexo=? 
     WHERE id = ?`,
    [nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo, id]
  );

  res.redirect('/usuarios');
};


// ver por usuario
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  res.render('detallUsuario', { usuario: usuario[0] });
};



const promesa = new Promise ((resolve, reject) => {
  let exito = true;
  if (exito){
    resolve("Yupi!");
  }else {
    reject("mecachis...");
  }
});

promesa
  .then(respuesta => {
    console.log("Respuesta:", respuesta);
  })
  .catch(error => {
    console.error("Error:", error);
  });


  const prepararDesayuno = new Promise((resolve, reject) => {
    let desayunoHecho = true; // Cámbialo a false para simular un fallo
  
    if (desayunoHecho) {
      resolve("🥞 El desayuno está listo.");
    } else {
      reject("❌ No hay desayuno.");
    }
  });
  
  prepararDesayuno
    .then(mensaje => {
      console.log("Éxito:", mensaje);
    })
    .catch(error => {
      console.error("Error:", error);
    });

    


function paso1() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Paso 1 completado"), 1000);
  });
}

function paso2(mensajeAnterior) {
  return new Promise(resolve => {
    setTimeout(() => resolve(mensajeAnterior + " → Paso 2 completado"), 1000);
  });
}

paso1()
  .then(resultado1 => paso2(resultado1))
  .then(resultadoFinal => {
    console.log("Resultado final:", resultadoFinal);
  });










  function obtenerUsuario() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ nombre: "Luz", edad: 35 });
      }, 1500);
    });
  }
  
  obtenerUsuario()
    .then(usuario => {
      console.log("Usuario cargado:", usuario);
    })
    .catch(error => {
      console.error("Fallo al obtener usuario:", error);
    });
    Usuario cargado: { nombre: 'Luz', edad: 35 }











// Paso 1: Obtener usuarios
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json()) // Paso 2: Convertir respuesta a JSON
  .then(usuarios => {
    console.log("Usuarios cargados ✅");
    const primerUsuario = usuarios[0];
    console.log("Primer usuario:", primerUsuario.name);
    
    // Paso 3: Obtener posts de ese usuario
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${primerUsuario.id}`);
  })
  .then(res => res.json()) // Paso 4: Convertir los posts a JSON
  .then(posts => {
    console.log("Posts del primer usuario:");
    posts.forEach(post => {
      console.log("📝", post.title);
    });
  })
  .catch(error => {
    console.error("⛔ Error en la cadena de promesas:", error);
  });
// 1️⃣ Declaramos una función asíncrona
async function obtenerDatos() {
  try {
    // 2️⃣ Pedimos la lista de usuarios
    const respuestaUsuarios = await fetch("https://jsonplaceholder.typicode.com/users");

    // 3️⃣ Verificamos si hubo error HTTP
    if (!respuestaUsuarios.ok) throw new Error("No se pudo obtener los usuarios");

    // 4️⃣ Convertimos la respuesta en JSON
    const usuarios = await respuestaUsuarios.json();
    console.log("Usuarios cargados:", usuarios);

    // 5️⃣ Tomamos el primer usuario
    const primerUsuario = usuarios[0];
    console.log("Primer usuario:", primerUsuario.name);

    // 6️⃣ Pedimos los posts del primer usuario
    const respuestaPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${primerUsuario.id}`);

    if (!respuestaPosts.ok) throw new Error("No se pudieron obtener los posts");

    const posts = await respuestaPosts.json();

    // 7️⃣ Mostramos los títulos de los posts
    console.log("Posts del primer usuario:");
    posts.forEach(post => {
      console.log("📝", post.title);
    });

  } catch (error) {
    // 8️⃣ Capturamos cualquier error
    console.error("⛔ Error encontrado:", error.message);
  }
}

// 9️⃣ Ejecutamos la función
obtenerDatos();
