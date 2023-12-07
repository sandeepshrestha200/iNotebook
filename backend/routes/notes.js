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


// ROUTE 2 : Add a new Noew Note using: POST "/api/notes/addnote/". Authentication Required
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

module.exports = router;
