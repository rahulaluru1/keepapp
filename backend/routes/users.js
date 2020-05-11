const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const validateRegisterInput = require("../auth/register");
const validateLoginInput = require("../auth/login");
const isEmpty = require("is-empty");
const Note = require("../models/notes.model");
require('dotenv').config();


const key=process.env.secretOrKey;
router.post("/register",(req,res)=>{
    console.log(req.body)
    const {errors, validate}= validateRegisterInput(req.body);
    if(!isEmpty(errors)){
       
        return res.status(400).json(errors);
    }
    Note.findOne({email:req.body.email}).then(note=>{
        if(note){
            return res.status(400).json({email:"This is an Existing email"});
        }else{
            const newNote=new Note({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newNote.password, salt, (err, hash) => {
                  if (err) throw err;
                  newNote.password = hash;
                  newNote
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        }
    })
});
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;

    Note.findOne({ email }).then(user => {

      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };
  
          jwt.sign(
            payload,
            key,
            {
              expiresIn: 31556926 
            },
            (err, token) => {
              res.json({
                message:"user logged in",
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


  module.exports = router;