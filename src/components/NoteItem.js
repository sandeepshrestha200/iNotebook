import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const NoteItem = (props) => {
  const { note } = props;

  return (
    <>
      {/* <div>{note.title}</div> */}

      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <FaTrashAlt className="mx-2" style={{ cursor: "pointer" }} />
              <FaEdit className="mx-2" style={{ cursor: "pointer" }} />
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
