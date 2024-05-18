const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors') 

const serviceAccount = require('./live-calcio-fyp-firebase-adminsdk-khx2u-92d7a92efe.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const auth = admin.auth();

const app = express();
app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.get('/getUsers', (req, res) => {
    auth.listUsers()
    .then((users) => {
        res.send(users);
        })
    .catch((error) => {
        res
        .status
        .send(error);
        }
        );
    });

app.post('/createUser', (req, res) => {
    const { displayName, email, password } = req.body;
    auth.createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: displayName,
        disabled: false,
        })
        .then((userRecord) => {
            console.log("Successfully created user:", userRecord);
            res.json(userRecord);
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            res.status(400).send(error);
        });
    }
    );

app.post('/deleteUser', (req, res) => {
    const uid = req.body.uid;
    auth.deleteUser(uid)
    .then(() => {
        console.log('Successfully deleted user');
        res.json(uid);
        })
    .catch((error) => {
        res.status(400).send(error);
        });
    });

    app.post('/updateUser', (req, res) => {
        const { uid, displayName, email, password } = req.body;
    
        auth.updateUser(uid, {
            email: email,
            emailVerified: false,
            password: password,
            displayName: displayName,
            disabled: false
        })
        .then((userRecord) => {
            console.log("Successfully updated user:", userRecord);
            res.json(userRecord);
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            res.status(400).send(error);
        });
    });    

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    });