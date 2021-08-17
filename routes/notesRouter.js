// Imports all the required modules, functions and files
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");

// GET method returns back the retrieved data as json file
router.get("/", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});

// POST method gets the data from the request and create a new object of newNote
// Writes the new note to the file system using the readAndAppend function
// And returns an error if fails to write the note to the file
router.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
  } else {
    res.json("Error in posting a new note");
  }
});

// DELETE method that gets the id from the request parameter
// Comperes it to the notes IDs and deletes the matching note
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

  const noteIndex = notes.findIndex(note => note.note_id === id);

  notes.splice(noteIndex, 1);

  writeToFile("./db/db.json", notes);
  return res.send();
});

// Exports the router module
module.exports = router;
