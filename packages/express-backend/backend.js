import express from "express";
import cors from "cors";

const app = express();
const port = 10000;




app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      
app.get('/users', (req, res) => {
    res.send(users);
});

const users = { 
    users_list : [
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
       },
      
    ]
 }
 
 const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}
const addUserID = () => {
    const id = Math.floor(100000 + Math.random() * 900000);
    const newID = id.toString();
    var count = 0;
    while (count < users['users_list'].length) {
        if (users['users_list'][count].id === newID) {
            newID = id.toString();
            count = 0;
        }
        count++;
    }
    return newID;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = addUserID();
    addUser(userToAdd);
    //console.log(userToAdd.id);
    // for (var i = 0; i < users['users_list'].length; i++) {
    //     console.log(users['users_list'][i].id);
    // }
    res.sendStatus(300);
});



const findUserByName = (name) => { 
   return users['users_list']
       .filter( (user) => user['name'] === name); 
}
const findUserByNameJob = (name,job) => {
    return users['users_list']
        .filter( (user) => user['job'] === job).filter((user) => user['name'] === name);
}

app.get('/users', (req, res) => {
   const name = req.query.name;
   if (name != undefined){
       let result = findUserByName(name);
       result = {users_list: result};
       res.send(result);
   }
   else{
       res.send(users);
   }
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (job != undefined && name != undefined){
        let result = findUserByNameJob(name,job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
 });
const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const findUserIndex = (id) => {
    return users['users_list'].findIndex((user) => user['id'] === id);
}
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const result = findUserIndex(id);
    let removed = users['users_list'].splice(result, 1);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    }
    else {
        res.send();
    }
});


