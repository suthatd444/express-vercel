// const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/divsly";
// db.superadmin = require("./superadmin.model.js")(mongoose);
// db.customer = require("./customer.model.js")(mongoose);
// db.labour_work = require("./labour_work.model.js")(mongoose);
// db.parts = require("./parts.model.js")(mongoose);
// db.invoice = require("./invoice.model.js")(mongoose);
// db.accounts = require("./accounts.model.js")(mongoose);
// db.receipt = require("./receipt.model.js")(mongoose);
module.exports = db;