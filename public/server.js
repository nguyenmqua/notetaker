// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 7000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars notes (DATA)
// =============================================================
var notes = [
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
  
});

// Displays all notes
app.get("/api/notes", function(req, res) {
var obj;
fs.readFile(__dirname + '/../db/db.json', "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    obj = JSON.parse(data)
    console.log(data);
   return res.json(obj)
  });
});

// Displays a single note, or returns false
app.delete("/api/notes/:note", function(req, res) {
  var chosen = req.params.note;

  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].id) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

// Create New notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var note = req.body;

  // Using a RegEx Pattern to remove spaces from newnote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  note.id = note.title.replace(/\s+/g,"").toLowerCase();

  console.log(note);
  console.log(notes);
  notes.push(note);

  res.json(note);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
