const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'kdeubuntudev',
        password: 'KDEUbuntuDev!',
        database: 'face_detectionReactDB'
    }
});

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req, res) => {image.handleAPICall(req,res)});

app.listen(port, () => {
    console.log("Server running on port ", port)
});