import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Note = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const openModalRef = useRef(null);
  const closeModalRef = useRef(null);

  const updateNote = (currentNote) => {
    openModalRef.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    // console.log(note);
    closeModalRef.current.click();
    getNotes();
  };

  return (
    <>
      {/* Modal */}
      <div>
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={openModalRef}>
          Launch edit modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Notes
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="m-2">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">
                        Title
                      </label>
                      <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">
                        Description
                      </label>
                      <textarea className="form-control" id="edescription" name="edescription" rows="4" value={note.edescription} onChange={onChange} minLength={10} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="etag" className="form-label">
                        Tag
                      </label>
                      <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={2} required />
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeModalRef}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" disabled={note.etitle.length < 3 || note.edescription.length < 10} onClick={handleEdit}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <h1>Your Notes</h1>
        {notes.length === 0 ? "No notes avaliable for now." : ""}
        <div className="row">
          {notes.map((note) => {
            return <NoteItem note={note} updateNote={updateNote} key={note._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
