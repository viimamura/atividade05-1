const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
//app.listen(3000);

app.get('/', function(req,res){res.send('Gamesearch')});


const feedbacks = [
      
]

const endpoint = "/feedbacks";

app.get(endpoint, function(req,res){
    res.send(feedbacks.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
        const id = req.params.id;
        const feedback = feedbacks[id];

        if(!feedback){
            res.send("{}");
        }
        else{
            res.send(feedback);
        }
});

app.post(endpoint, function(req,res){
    const feedback = {
        id: feedbacks.length,
        assunto: req.body["assunto"],
        feedbacktext: req.body["feedbacktext"]
    };
    feedbacks.push(feedback);
    res.send("1");
    notify();
});

app.delete(`${endpoint}/:id`, (req, res) => {
    const id = req.params.id;
    delete feedbacks[id];
    res.send("Feedback Deletado");

    // Notificar todos
    notify();
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const INVALIDATE = 'invalidate';

function notify(){
    io.sockets.emit(INVALIDATE,1);
}

server.listen(process.env.PORT || 3000);