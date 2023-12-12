import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "test" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNewNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  return (
    <>
      <div className="container my-4">
        <h1>Add a Note</h1>
        <div className="my-3">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input type="text" className="form-control w-50" id="title" name="title" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea className="form-control w-50" id="description" name="description" rows="4" onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-primary" onClick={addNewNote}>
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNote;
