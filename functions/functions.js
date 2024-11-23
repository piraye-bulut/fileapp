const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Belirli IP adreslerine izin ver
const ALLOWED_IPS = ["IP_ADDRESS_1", "IP_ADDRESS_2"];

const validateRequest = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (ALLOWED_IPS.includes(ip)) {
    next();
  } else {
    res.status(403).send("Access Denied: Unauthorized IP!");
  }
};

exports.secureFunction = functions.https.onRequest((req, res) => {
  validateRequest(req, res, () => {
    res.send("Access granted!");
  });
});
