const express = require("express");
const path = require("path");
const noteRouter = require("./routes/notesRouter")

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use('/api/notes', noteRouter);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
