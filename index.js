const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
//app.listen(3000);

app.get('/', function(req,res){res.send('Gamesearch')});


const feedbacks = [
      {id:0, assunto: "teste", feedbacktext: "feedbackteste"}
]

const endpoint = "/feedbacks";

app.get(endpoint, function(req,res){
    res.send(feedbacks.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
        const id = req.params.id;
        const feedbacks = feedbacks[id];

        if(!feedbacks){
            res.send("{}");
        }
        else{
            res.send(feedbacks);
        }
});

app.post(endpoint, function(req,res){
    const feedbacks = {
        id: feedbacks.length,
        assunto: req.body["assunto"],
        feedbacktext: req.body["feedbacktext"]
    };
    feedbacks.push(feedbacks);
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