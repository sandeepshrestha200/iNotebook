import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

const Home = () => {
  return (
    <>
      <div className="my-4">
        <AddNote />

        <Note />
      </div>
    </>
  );
};

export default Home;
