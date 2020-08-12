const { Profile } = require("../models/profile");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    console.log("file :: ", file);
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  // console.log("Images request ", req.file);
  try {
    const profile = new Profile({
      name: req.file.name,
      profileUrl: req.file.path,
    });
    const result = await profile.save();
    res.send(result);
  } catch (err) {
    throw new Error("Error in upload Image :: << -- >>", err);
  }
});

module.exports = router;
