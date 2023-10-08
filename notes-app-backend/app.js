// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Conexión a MongoDB


mongoose.connect('mongodb+srv://andreayulitzacastrogomez88:ZLgGJbGJKsjonAmC@cluster0.gb4wkof.mongodb.net/NotesApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes')); 

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
