// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    // Validar los datos de entrada, por ejemplo, verificar que el correo electrónico sea único
    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Crear un nuevo usuario en la base de datos
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para iniciar sesión y obtener un token JWT
router.post('/login', async (req, res) => {
 
  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const passwordValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT y enviarlo como respuesta
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
    const username = {
      "username": user.username,
      "email": user.email
    };

    res.json({ token: token, username:username  });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.get('/verifyToken', verifyToken, async (req, res) => {

  try {
    res.json("ok");
  } catch (error) {
    res.status(500).json({ error});
  }
})


// Ruta para obtener el perfil del usuario (requiere autenticación)
router.get('/profile', (req, res) => {
  res.json({ user: req.user }); // req.user contiene la información del usuario autenticado
});

// Ruta para actualizar una nota por su ID (requiere autenticación)
router.put('/:noteId', verifyToken, async (req, res) => {
    try {
      const note = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
          title: req.body.title,
          content: req.body.content,
        },
        { new: true } // Para obtener la nota actualizada
      );
  
      if (!note) {
        return res.status(404).json({ error: 'Nota no encontrada' });
      }
  
      res.json({ message: 'Nota actualizada con éxito', note });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la nota' });
    }
  });

// Ruta para eliminar una nota por su ID (requiere autenticación)
router.delete('/:noteId', verifyToken, async (req, res) => {
    try {
      const note = await Note.findByIdAndRemove(req.params.noteId);
  
      if (!note) {
        return res.status(404).json({ error: 'Nota no encontrada' });
      }
  
      res.json({ message: 'Nota eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la nota' });
    }
  });
  
module.exports = router;


