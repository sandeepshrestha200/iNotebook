import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const ab = useContext(noteContext);
  useEffect(() => {
    ab.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is about page. This is created {ab.state.name} from {ab.state.class}.
    </div>
  );
};

export default About;
