
const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


const users = {
    users_list:
    [
        { 
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
         },
         {
            id : 'abc123', 
            name: 'Mac',
            job: 'Bouncer',
         },
         {
            id : 'ppp222', 
            name: 'Mac',
            job: 'Professor',
         }, 
         {
            id: 'yat999', 
            name: 'Dee',
            job: 'Aspring actress',
         },
         {
            id: 'zap555', 
            name: 'Dennis',
            job: 'Bartender',
         } 
    ]
}


app.get('/users', (req, res) => {
    res.send(users);
});


app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUsersByNameJob(name,job);
        result = {users_list: result};
        res.send(result);
    } else if (name != undefined && job == undefined)
    {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

function findUsersByNameJob(name,job) {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

app.post('/users', (req, res) => {
    if(req.body.id == undefined)
    {req.body.id = IdGenerator();}
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const userToDelete = req.body;
    if (userToDelete === undefined || userToDelete.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(userToDelete);
        res.status(204).end();
    } 
});

function deleteUser(user){
    users['users_list'].splice(user,1);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function IdGenerator()
{
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return characters.charAt(getRandomInt(62)) + characters.charAt(getRandomInt(62)) + characters.charAt(getRandomInt(62)) + characters.charAt(getRandomInt(62)) + characters.charAt(getRandomInt(62));
}