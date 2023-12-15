import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const { showAlert } = props;

  const context = useContext(noteContext);
  const { addNote, getNotes } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNewNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    getNotes();
    setNote({ title: "", description: "", tag: "" });
    showAlert("Notes Added Successfully.", "success");

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
              <input type="text" className="form-control w-50" id="title" name="title" onChange={onChange} value={note.title} minLength={3} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea className="form-control w-50" id="description" name="description" rows="4" onChange={onChange} value={note.description} minLength={10} required />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input type="text" className="form-control w-50" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={2} required />
            </div>
            <button type="submit" disabled={note.title.length < 3 || note.description.length < 10} className="btn btn-primary" onClick={addNewNote}>
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNote;
