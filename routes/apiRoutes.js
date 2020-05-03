// TODO: importing the store
const store = require("../db/store");
const router = require("express").Router();

// building out routes
// and using these routes to call your store methods

router.get("/notes", function(req, res) {
    store.getNotes().then(function(notes) {
        res.json(notes)
    });
});

router.post("/notes", function(req, res) {
    store.addNote(req.body).then(function(note) {
        res.json(note)
    });
});

router.delete("/notes/:id", function(req, res) {
//     store.removeNote(req.params.id).then(function(something) {
//         res.json(something)
//     });
// });
var deleteNote = store.removeNote(req.params.id);
try {
    res.json(deleteNote)
}
catch {
    err => res.status(500).json(err);
}
});


module.exports = router;