const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
  read() {
    return readFileAsync("./db/db.json", "utf8")
  }

  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note))
  }

  getNotes() {
    return this.read().then(notes => {
      // parse the JSON string and turn into an object
      // add them to a list
      var notesList = JSON.parse(notes);
      // return that list (array)
      return notesList;
    })
  }

  async addNote(note) {
    // use the note argument
    // create a new note object with your required fields (text, title, id)
    var newNote = {
      text: note.text,
      title: note.title,
      id: uuidv1.v1()
    }
    // write that object to the json file
    // return this.getNotes()
    // .then(notes => {
    //   notes.push(newNote);
    //   return this.write(notes);
    // })
    var updatedNotes = await this.getNotes();
    updatedNotes.push(newNote);
    await this.write(updatedNotes);
    return updatedNotes;
  }

  async removeNote(id) {
    // get all notes
    var notesList = await this.getNotes();
    // this.getNotes().then(notes => {
    // remove the note with the given id
    var filteredList = await notesList.filter(note => note.id !== id)
    // var noteList = JSON.parse(notes);
    // var keepArr = [];
    // for (let i = 0; i < noteList.length; i++) {
    //   if (noteList[i].id !== id) {
    //     keepArr.push(noteList[i])
    //   }
    await this.write(filteredList);
      // and return a list of notes that does NOT have that id (in essence the filtered list)
      return filteredList;
      // return this.write(keepArr);
    // }   
  // })
  }

}

module.exports = new Store()