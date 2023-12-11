import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Sandeep Shrestha",
    class: "BCA",
  };

  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "Shrestha Shrestha",
        class: "BCA 5th Semester",
      });
    }, 2000);
  };

  return <NoteContext.Provider value={{state, update}}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
