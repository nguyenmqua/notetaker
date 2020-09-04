

// Displays all notes
module.exports = function(app) {
    var fs = require("fs")
    var notes = [
    ];
   
    app.get("/api/notes", function(req, res) {
      console.log("get -/api/notes")
       
        fs.readFile("./db/db.json","utf8", function(error, data){

        if (error) {
        return console.log(error);
        }
        var obj = JSON.parse(data)
       
        return res.json(obj)
     });
    });

// Displays a single note, or returns false
    app.delete("/api/notes/:id", function(req, res) {
  var note = req.params.id;

console.log("/api/notes/:id")

  for (var i = 0; i < notes.length; i++) {
    if (note === notes[i].id) {
      
      notes.splice(i,1);
      var json = JSON.stringify(notes);
      function writeFile(){
        fs.writeFile(__dirname + '/../db/db.json', json, 'utf8',function(err) {
      
          if (err){
            return console.log(err);
          }
          console.log("File Appended")
        });
        }
      writeFile()
      return res.json(notes);
    }
  }
  return res.json(false);
    });

// Create New notes - takes in JSON input
    app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var note = req.body;
  console.log("post")
  // Using a RegEx Pattern to remove spaces from newnote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  note.id = note.title.replace(/\s+/g,"").toLowerCase();
  notes.push(note)
  var json = JSON.stringify(notes);
  function writeFile(){
    fs.writeFile(__dirname + '/../db/db.json', json, 'utf8',function(err) {
  
      if (err){
        return console.log(err);
      }
      console.log("File Appended")
    });
    }
  writeFile()

  res.json(notes);
    })
};

 