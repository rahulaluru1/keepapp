const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  //id
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
      {
        //id
          title:{
              type: String
          },
          content:{
              type:String
          }
      }
  ]
},
{
    timestamps: true,
  });



  const Note=mongoose.model('Note',noteSchema);

  module.exports = Note;