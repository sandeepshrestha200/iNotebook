const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  var obj = {
    path: "/auth",
    port: 3000,
  };
  res.json(obj);
});

module.exports = router;
