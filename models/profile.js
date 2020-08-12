const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports.Profile = Profile;
