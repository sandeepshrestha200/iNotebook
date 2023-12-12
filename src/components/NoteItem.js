import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;

  return (
    <>
      {/* <div>{note.title}</div> */}

      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div className="d-flex align-items-center justify-content-center fs-5 icon-container mx-5 py-2 rounded-pill">
              <FaTrashAlt
                className="mx-2 text-danger icon"
                onClick={() => {
                  deleteNote(note._id);
                }}
              />
              <FaEdit className="mx-2 text-success icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
