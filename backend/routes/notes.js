const router = require('express').Router();
let Note=require('../models/notes.model');
let  ObjectID = require('mongodb').ObjectID;

router.route('/:user_id').get((req, res) => {
    const user_id=req.params.user_id;
    Note.findById(ObjectID(user_id))
      .then(notes => {res.json(notes)})
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:user_id/add').post((req, res) => {
    const title = req.body.title;
    const content=req.body.description;
    const user_id=req.params.user_id;
    Note.findById(ObjectID(user_id)).exec(function(err,note){
      note.notes.push({"title":title,
                      "content":content});
      note.save().then((reponse) =>{
        res.json(reponse)
      })
      .catch(err => res.status(400).json('Error: ' + err));
    });
  });

  router.route('/:user_id/:note_id').delete((req, res) => {
    const user_id=req.params.user_id;
    const  note_id=req.params.note_id;
    Note.findOneAndUpdate({'_id':ObjectID(user_id)},
    {$pull:{notes:{"_id":ObjectID(note_id)},
    returnNewDocument:true  
  }}
    )
    .then(notes=>res.json(notes));

  });
  module.exports = router;
