const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Uses public folder
app.use(express.static('public'));

// Path to the JSON database file
const dbPath = path.join(__dirname, 'db', 'db.json');

// Read the notes from the database file
const readNotesFromDB = () => {
    try {
      const dbData = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(dbData);
    } catch (error) {
      console.error('Error reading from the database:', error);
      return [];
    }
  };
  
// Write the notes to the database file
const writeNotesToDB = (notes) => {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
    } catch (error) {
      console.error('Error writing to the database:', error);
    }
  };
  

// Get all notes
app.get('/api/notes', (req, res) => {
    const notes = readNotesFromDB();
    res.json(notes);
  });
  
  // Create a new note
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = readNotesFromDB();
    newNote.id = Date.now().toString(); // Generate a unique ID for the note
  
    notes.push(newNote);
    writeNotesToDB(notes);
  
    res.status(201).json(newNote);
  });
  
  // Delete a note
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const notes = readNotesFromDB();
    const index = notes.findIndex((note) => note.id === noteId);
  
    if (index !== -1) {
      notes.splice(index, 1);
      writeNotesToDB(notes);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
  


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
