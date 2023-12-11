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

  return <NoteContext.Provider value={{ notes, setNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
