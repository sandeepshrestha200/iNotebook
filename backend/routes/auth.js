const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a User using: POST "/api/auth/createuser/". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Enter a valid password(minimum 5 characters).").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // returning errors for bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //Checking Unique Email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ message: "User created successfully.", user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = router;
