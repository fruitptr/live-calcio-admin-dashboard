var admin = require("firebase-admin");

var serviceAccount = require("./live-calcio-fyp-firebase-adminsdk-khx2u-92d7a92efe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
