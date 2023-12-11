import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Note from "./components/Note";
import NoteState from "./context/notes/NoteState";

function App() {

  return (
    <>
     
      <NoteState>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/note" element={<Note />} />
          </Routes>

          <div className="App">
            <h1>This is iNotebook.</h1>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
