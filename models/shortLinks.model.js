const mongoose = require("mongoose");

const shortLinks = mongoose.model(
  "shortlink",
  new mongoose.Schema({
    userId: {
      type: String,
    },
    utmId: {
      type: String,
      required: true,
    },
    destinationUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    brandedDomain: {
      type: String,
      required: true,
    },
    slashTag: {
      type: String,
      required: true,
    },
    qrCodeImage: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    expirationDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Expiration Date is required.'],
    },
  }, {
    timestamps: true
  })
);

module.exports = shortLinks;
