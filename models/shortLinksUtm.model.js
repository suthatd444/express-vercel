const mongoose = require("mongoose");

const UTM = mongoose.model(
  "utm",
  new mongoose.Schema({
    userId: {
      type: String,
    },
    campaignId: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      required: true,
    },
    utmname: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true
  })
);

module.exports = UTM;
