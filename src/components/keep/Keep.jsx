import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import '../App.css';

class  Keep extends React.Component {
  constructor(props){
    super(props);
    console.log("in keep");
    this.state={notes: []};
    this.addNote=this.addNote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
    this.onLogoutClick=this.onLogoutClick.bind(this);
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
    componentDidMount(){
      axios.get('http://localhost:5000/notes')
    .then(response => {
      if(response.data.length>0){
        this.setState({ notes: response.data })
      } 
    })
    .catch((error) => {
      console.log(error);
    })
    }
 

   addNote(newNote) {
    const note={
      title: newNote.title,
      description: newNote.content
    }
   axios.post('http://localhost:5000/notes/add', note)
        .then(res => console.log(res.data));
  }

   deleteNote(id) {
     console.log(id);
     axios.delete('http://localhost:5000/notes/'+id)
    .then(res => console.log(res.data));
  this.setState({
    notes: this.state.notes.filter(el => el._id !== id)
  })
  }
render(){
  return (
    
    <div>
    <Header
    onLogoutClick={this.onLogoutClick} />
    <CreateArea onAdd={this.addNote} />
    {this.state.notes.map((noteItem, index) => {
      return (
        <Note
          key={index}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.description}
          onDelete={this.deleteNote}
        />
      );
    })}
    <Footer />
  </div>
 
);
}
  
}

Keep.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Keep);
// export default Keep;
