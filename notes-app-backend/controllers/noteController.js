const Note = require('../models/Note');

// Crear una nueva nota
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const note = new Note({
      title,
      content,
      user: userId,
    });

    await note.save();
    res.json({ message: 'Nota creada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la nota' });
  }
};

// Obtener todas las notas del usuario
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las notas' });
  }
};

// Actualizar una nota por su ID
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.noteId;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json({ message: 'Nota actualizada con éxito', note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la nota' });
  }
};

// Eliminar una nota por su ID
exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.findByIdAndRemove(noteId);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json({ message: 'Nota eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
};
