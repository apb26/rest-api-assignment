const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid'); 

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];

app.post('/users', (req, res) => {
    const {name, email} = req.body;

    if(!name || !email)
        return res.status(400).json({error: 'Both name and email are required'});
    
    const newUser = {
        id: uuidv4().split('-')[0], 
        name, 
        email};

        users.push(newUser);

        res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    const user = users.find(u => u.id == id);

    if(!user)
        return res.status(404).json({error: 'User not found'});

    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const {id} = req.params
    const user = users.find(u => u.id == id);

    if(!user)
        return res.status(404).json({error: 'User not found'});

    const {name, email} = req.body;

    if(!name || !email)
        return res.status(400).json({error: 'Both name and email are required'});

    user.name = name;
    user.email = email;

    res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params
    const user = users.find(u => u.id == id);

    if(!user)
        return res.status(404).json({error: 'User not found'});

    users.splice(user, 1);

    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
