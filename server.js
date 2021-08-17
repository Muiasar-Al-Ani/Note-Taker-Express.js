const express = require("express");
const path = require("path");
const { readFromFile, writeToFile, readAndAppend } = require("./helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const util = require("util");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
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

app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params)
  const { id } = req.params;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
 
  const noteIndex = notes.findIndex(note => note.note_id === id);
  console.info(noteIndex)
  notes.splice(noteIndex, 1);
  writeToFile('./db/db.json', notes)
  return res.send();
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
