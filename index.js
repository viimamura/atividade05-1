const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
//app.listen(3000);


app.get('/', function(req,res){res.send('Hello word')});


const notes = [
      
]

const endpoint = "/notes";

app.get(endpoint, function(req,res){
    res.send(notes.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
        const id = req.params.id;
        const note = notes[id];

        if(!note){
            res.send("{}");
        }
        else{
            res.send(note);
        }
});

app.post(endpoint, function(req,res){
    const note = {
        id: notes.length,
        email: req.body["email"],
        senha: req.body["senha"]
    };
    notes.push(note);
    res.send("1");
    notify();

});

app.put(`${endpoint}/:id`, function(req,res){
    const id =  parseInt( req.params.id);
    const note = {
        id: id,
        email: req.body["email"],
        senha: req.body["senha"]
    };

    notes[id] = note;
    res.send("1");
    notify();
})

app.delete(`${endpoint}/:id`, function(req,res){
    const id = req.params.id;
    delete notes[id];
    res.send("1");

    notify();

});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const INVALIDATE = 'invalidate';

function notify(){
    io.sockets.emit(INVALIDATE,1);
}

server.listen(3000);