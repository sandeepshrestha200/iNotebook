import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NzAzYTczOGQzMDA3OWMyOTJjNzBhIn0sImlhdCI6MTcwMjI5ODUzNn0.hHFS7xQs6Adepinuwc-rfqiuxIqza6mzKW8-SXk3yAY",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a Note

  const addNote = async (title, description, tag) => {
    // console.log("Adding New Note");

    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NzAzYTczOGQzMDA3OWMyOTJjNzBhIn0sImlhdCI6MTcwMjI5ODUzNn0.hHFS7xQs6Adepinuwc-rfqiuxIqza6mzKW8-SXk3yAY",
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const responseJSON = await response.json();
    console.log(responseJSON.message);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NzAzYTczOGQzMDA3OWMyOTJjNzBhIn0sImlhdCI6MTcwMjI5ODUzNn0.hHFS7xQs6Adepinuwc-rfqiuxIqza6mzKW8-SXk3yAY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const responseJSON = await response.json();

    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      break;
    }
    console.log(responseJSON);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NzAzYTczOGQzMDA3OWMyOTJjNzBhIn0sImlhdCI6MTcwMjI5ODUzNn0.hHFS7xQs6Adepinuwc-rfqiuxIqza6mzKW8-SXk3yAY",
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    const responseJSON = await response.json();
    console.log(responseJSON.message);
  };

  return <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
