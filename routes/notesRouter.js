const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid')
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");



router.get("/", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;
  console.info(req.body);

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

router.delete("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

  const noteIndex = notes.findIndex(note => note.note_id === id);
  console.info(noteIndex);
  notes.splice(noteIndex, 1);
  writeToFile("./db/db.json", notes);
  return res.send();
});

module.exports = router;
