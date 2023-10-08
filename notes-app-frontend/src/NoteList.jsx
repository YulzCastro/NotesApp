import React from 'react';
import Note from './components/Note';

function NoteList() {
  const notes = [
    { id: 1, title: 'Note 1', content: 'Content of Note 1' },
    { id: 2, title: 'Note 2', content: 'Content of Note 2' },
    { id: 3, title: 'Note 3', content: 'Content of Note 3' },
  ];

  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} title={note.title} content={note.content} />
      ))}
    </div>
  );
}

export default NoteList;