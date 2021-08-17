// Imports all the required modules and files
const express = require("express");
const path = require("path");
const noteRouter = require("./routes/notesRouter")

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Makes the public folder static "accessible to the public"
app.use(express.static("public"));

// Uses the noteRouter.js for the /api/notes route
app.use('/api/notes', noteRouter);

// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listens for the used in the App
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
