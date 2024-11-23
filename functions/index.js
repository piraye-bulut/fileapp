
const admin = require("firebase-admin");
admin.initializeApp();

const {secureFunction} = require("./functions");

exports.secureFunction = secureFunction;
