import React from "react";

const NoteItem = (props) => {
  const { note } = props;

  return (
    <>
      {/* <div>{note.title}</div> */}

      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, iste natus repudiandae quibusdam provident explicabo dolorem officiis animi voluptate consequatur!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
