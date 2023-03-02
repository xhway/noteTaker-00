const router = require('express').Router();

const saved = require('../helpers/saved');

// get the existing notes
router.get('/notes', (req,res) =>{
    saved   
        .getNotes()
        .then(notes =>{
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
//post new notes
router.post('/notes', (req,res) =>{
    console.log(req.body)
    saved
        .addNote(req.body)
        .then(note => {
            res.json(note)
        })
        .cath(err =>{
            res.status(500).json(err)
        })
})
//delete notes
router.delete('/notes/:id', (req, res) =>{
    saved 
        .removeNote(req.params.id)
        .then(()=> res.json({ok:true}))
        .cath(err => res.status(500).json(err))
})

module.exports = router;
