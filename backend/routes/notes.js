const router = require('express').Router();
let Note=require('../models/notes.model');

router.route('/').get((req, res) => {
    const username=req.params.username;
    Note.find({"username":username})
      .then(notes => res.json(notes))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content=req.body.content;
    const username=req.params.username;
    Note.findOne({'username':username}).exec(function(err,note){
      note.notes.push({"title":title,
                      "description":content});
      note.save().then((res) =>{
        console.log('note added');
        console.log(res);
      })
      .catch(err => res.status(400).json('Error: ' + err));
    });
  });

  router.route('/:id').delete((req, res) => {
    const username=req.params.username;
    const  id=req.body.id;
    // Note.updateOne({'username':username},
    // {$pull:{"notes":{"_id":id}}}
    // )
    // .then((res)=>{
    //   console.log(res)
    //   console.log('deleted')})
      Note.findOne({'username':username}).exec(function(err,note){
        note.notes.pull({"_id":id});
        note.save().then((res) =>{
          console.log('note added');
          console.log(res);
        })
      .catch(err => res.status(400).json('Error: ' + err));
  });
});
  
  module.exports = router;