const express = require('express');
const cors = require('cors');
const mongoose = require(`mongoose`);

require('dotenv').config();

const passport = require("passport");
const users = require("./routes/users");
const notes = require("./routes/notes");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(passport.initialize());
require("./passport")(passport);
app.use("/users", users);
app.use("/notes",notes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});