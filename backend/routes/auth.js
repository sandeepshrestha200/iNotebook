require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SERECT = process.env.JWT_SERECT;

// ROUTE 1 : Create a User using: POST "/api/auth/createuser/". Doesn't require Auth
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

    var success = false;
    //Checking Unique Email
    try {
      var user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;

        return res.status(400).json({ success, message: "Email already exists" });
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
      success = true;
      res.json({ success, message: "User created successfully.", accessToken });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// ROUTE 2 :  Authenticate a User using: POST "/api/auth/login". Required Auth
router.post("/login", [body("email", "Enter a valid email.").isEmail(), body("password", "Password cannot be empty).").exists()], async (req, res) => {
  // returning errors for bad requests
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  var success = false;
  try {
    var user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, message: "Try Again!, Invalid User credentials." });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    // console.log(passwordCompare);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, message: "Try Again!, Invalid User credentials." });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const accessToken = jwt.sign(data, JWT_SERECT);
    success = true;
    res.json({ success, message: "User Logged in successfully.", accessToken });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 3 :  Get Logged in Userdetails using: POST "/api/auth/getuser". Required Auth
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ user });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
