const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SERECT = "IAmLearningReactJSNow.";

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

    const salt = await bcrypt.genSalt(10);

    var secPass = await bcrypt.hash(req.body.password, salt);

    //Checking Unique Email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const accessToken = jwt.sign(data, JWT_SERECT);

      res.json({ message: "User created successfully.", accessToken });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// Authenticate a User using: POST "/api/auth/login". Doesn't require Auth
router.post("/login", [body("email", "Enter a valid email.").isEmail(), body("password", "Password cannot be empty).").exists()], async (req, res) => {
  // returning errors for bad requests
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Try Again!, Invalid User credentials." });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    // console.log(passwordCompare);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Try Again!, Invalid User credentials." });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const accessToken = jwt.sign(data, JWT_SERECT);

    res.json({ message: "User Logged in successfully.", accessToken });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
