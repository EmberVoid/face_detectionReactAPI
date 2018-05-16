const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'abc',
            entries: 0,
            joined: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    res.send(database.users)
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email
        &&
        req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('Error logging in');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '3',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1])
});

app.get ('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    });

    if (!found){
        res.status(404).json('No user');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!found){
        res.status(404).json('No user');
    }
});

app.listen(port, () => {
   console.log("Server running on port ", port)
});