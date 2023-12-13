import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Note = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container my-4">
        <h1>Your Notes</h1>
        <div className="row">
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
