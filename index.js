const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
//app.listen(3000);

app.get('/', function(req,res){res.send('Hello word')});


const users = [
      
]

const endpoint = "/users";

app.get(endpoint, function(req,res){
    res.send(users.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
        const id = req.params.id;
        const user = users[id];

        if(!user){
            res.send("{}");
        }
        else{
            res.send(user);
        }
});

app.post(endpoint, function(req,res){
    const user = {
        id: users.length,
        email: req.body["email"],
        senha: req.body["senha"]
    };
    users.push(user);
    res.send("1");
    notify();

});

app.put(`${endpoint}/:id`, function(req,res){
    const id =  parseInt(req.params.id);
    const user = {
        id: id,
        email: req.body["email"],
        senha: req.body["senha"]
    };

    users[id] = user;
    res.send("1");
    notify();
})

app.delete(`${endpoint}/:id`, function(req,res){
    const id = req.params.id;
    delete users[id];
    res.send("1");

    notify();

});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const INVALIDATE = 'invalidate';

function notify(){
    io.sockets.emit(INVALIDATE,1);
}

server.listen(process.env.PORT || 3000);