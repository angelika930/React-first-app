import express from "express";
import cors from "cors";
import userModel from "./user-services.js";
//import "./user.js";


const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      


// const users = { 
//     users_list : [
//        { 
//           id : 'xyz789',
//           name : 'Charlie',
//           job: 'Janitor',
//        },
//        {
//           id : 'abc123', 
//           name: 'Mac',
//           job: 'Bouncer',
//        },
//        {
//           id : 'ppp222', 
//           name: 'Mac',
//           job: 'Professor',
//        }, 
//        {
//           id: 'yat999', 
//           name: 'Dee',
//           job: 'Aspring actress',
//        },
//        {
//           id: 'zap555', 
//           name: 'Dennis',
//           job: 'Bartender',
//        },
      
//     ]
//  }
app.get('/users', (req, res) => {
    userModel.getUsers(req.query.name,req.query.job)
        .then((result) => {
            res.send({users_list: result});
        })
    
});
// app.get('/users', (req,res) =>{
//     const name = req.query.name;
//     const job = req.query.job;
//     try {
//         let result;
//         if (name && job) {
//             result = userModel.findUserByNameJob(name,job);
//             res.send(result);        }
//     }
//     catch (error) {
//         res.send(error);
//     }
// });
//  const addUser = (user) => {
//     users['users_list'].push(user);
//     return user;
// }
function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
        promise = userModel.find();
    }
    else if (name && !job) {
        promise = userModel.find({ name: name });
    } else if (job && !name) {
        promise = userModel.find({ job: job });
    }
    return promise;
}
// function addUser(user) {
//   const userToAdd = new userModel(user);
//   const promise = userToAdd.save();
//   return promise;
// }
// const generateID = () => {
//     const id = Math.floor(100000 + Math.random() * 900000);
//     const newID = id.toString();
//     var count = 0;
//     while (count < users['users_list'].length) {
//         if (users['users_list'][count].id === newID) {
//             newID = id.toString();
//             count = 0;
//         }
//         count++;
//     }
//     return newID;
// }

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    //userToAdd.id = generateID();
    userModel.addUser(userToAdd)
       .then((result) => {
        console.log(result);
        res.status(201).send(userToAdd);
       })
       .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
    
    
});

// const findUserByName = (name) => { 
//    return users['users_list']
//        .filter( (user) => user['name'] === name); 
// }
function findUserByName(name) {
    return userModel.find({ name: name });
}
  
app.get('/users', (req, res) => {
    const name = req.query.name;
    userModel.findUserByName(name)
        .then((result) => {
            if (result !== undefined) {
                result = {users_list: result};
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(404).send(error);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
 });

    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    userModel.findUserById(id)
        .then ((result) => {
            if (result !== undefined) {
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(404).send(error);
        })
});
// const findUserByNameJob = (name,job) => {
//     return users['users_list']
//         .filter( (user) => user['job'] === job).filter((user) => user['name'] === name);
// }

//Newly added
function findUserByJob(job) {
    return userModel.find({ job: job });
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userModel.findUserByNameJob(name,job)
        .then ((result) => {
            if (job != undefined && name != undefined){
                result = {users_list: result};
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(404).send(error)
        })

 });



app.delete('/users', (req, res) => {
    const id = req.params['id'];
    const result = userModel.findUserIndex(id);
    let removed = users['users_list'].splice(result, 1);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    }
    else {
        res.status(204).send("User Deleted.");
    }
});


