const util = require ("util");
const fs = require("fs");
const uuid = require("uuid").v1;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Saved{
    read(){
        return readFileAsync("../Develop/db/db.json", "utf8")
    }
    write(note){
        return writeFileAsync("../Develop/db/db.json", JSON.stringify(note))
    }
    addNote(note){
        const {title, text} = note

        if (!title || !text) {
            throw new error("Section cannot be blank")
        }
        const newNote = { title, text, id: uuid() }

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }
    getNotes(){
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Saved();