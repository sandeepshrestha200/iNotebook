const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

// ROUTE 1 : Fetching all the notes of the User using: GET "/api/notes/fetchallnotes/". Authentication Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 2 : Add a New Note using: POST "/api/notes/addnote/". Authentication Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title.").isLength({ min: 3 }),
    body("description", "Description must be 10 characters").isLength({ min: 10 }),
    // body("password", "Enter a valid password(minimum 5 characters).").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // returning errors for bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({ message: "Note added successfully.", savedNote });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// ROUTE 3 : Update an Existing Note using: PUT "/api/notes/updatenote/:id". Authentication Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a new note object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be update and update it

    const checkNote = await Notes.findById(req.params.id);
    if (!checkNote) {
      return res.status(404).send("Not Found");
    }
    if (checkNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 4 : Delete an Existing Note using: DELETE "/api/notes/deletenote/:id". Authentication Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    
    // Find the note to be delete and delete it
    const checkNote = await Notes.findById(req.params.id);
    if (!checkNote) {
      return res.status(404).send("Not Found");
    }
    if (checkNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "Note has been deleted.", note });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
