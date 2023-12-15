import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

const Home = (props) => {
  const { showAlert } = props;

  return (
    <>
      <div className="my-4">
        <AddNote showAlert={showAlert} />

        <Note showAlert={showAlert} />
      </div>
    </>
  );
};

export default Home;
