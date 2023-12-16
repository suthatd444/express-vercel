const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      // trim: true,
      // unique: [true, 'Username already exists.']
    },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    mobile: {
      type: Number,
      // required: true,
    },
    token: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.'],
      required: true,
      // trim: true,
      // unique: [true, 'Email already exists.'],
    },
    password: {
      type: String,
      required: true,
      // trim: true
    },
    userType: {
      type: String,
      // trim: true,
      enum: ['superadmin', 'user'],
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  })
);

module.exports = User;
