import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "657704dd38d30079c292c722",
      user: "657703a738d30079c292c70a",
      title: "My title2",
      description: "Description2",
      tag: "demo Tag2",
      date: "2023-12-11T12:47:25.614Z",
      __v: 0,
    },
    {
      _id: "657704ec38d30079c292c724",
      user: "657703a738d30079c292c70a",
      title: "My title",
      description: "Description",
      tag: "demo Tag",
      date: "2023-12-11T12:47:40.561Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note

  const addNote = (title, description, tag) => {
    console.log("Adding New Note");
    var note = {
      _id: "657704ec38d30079c292c72466jhkghj",
      user: "657703a738d30079c292c70a",
      title: title,
      description: description,
      tag: tag,
      date: "2023-12-11T12:47:40.561Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
    console.log("New Note Added");
  };

  // Edit a Note
  const editNote = () => {};

  // Delete a Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
