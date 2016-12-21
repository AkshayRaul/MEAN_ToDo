var express = require('express');
var app=express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/test");
var db= mongoose.connection;

Tasks = require("./models/tasks");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());

// Set Static Folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());


app.get('/api/tasks',function(req,res){
    Tasks.getTasks(function (err,tasks) {
        if(err){
            throw err;
        }
        res.json(tasks);
    })
});

app.post('/api/task',function(req,res){
    var task = req.body;
    console.log(task);
    Tasks.addTask(task,function (err,task) {
        if(err){
            throw err;
        }
        res.json(task);
    });
});

app.delete('/api/task/:_id',function(req,res){
    var id = req.params._id;
    Tasks.removeTask(id,function (err,task) {
        if(err){
            throw err;
        }
        res.json(task);
    });
});


app.put('/api/tasks/:_id',function(req,res){
    var task = req.body;
    var _id=req.params._id;
  console.log("Here");
    console.log(task.title);
    Tasks.updateTask(_id,task,{},function (err,task) {
        if(err){
            throw err;
        }
        console.log("success");
        res.json(task);
    });
});


app.get('/api/tasks/:_id',function(req,res){

    Tasks.getTaskById(req.params._id,function (err,task) {
        if(err){
            throw err;
        }
        res.json(task);
    })
});


app.get('/api/tasks',function(req,res){
    Tasks.getTasks(function (err,tasks) {
        if(err){
            throw err;
        }
        res.render('index',{tasks :tasks});
    })
});

app.post('/api/tasks',function(req,res){
    var task = req.body;

    Tasks.addTask(task,function (err,task) {
        if(err){
            throw err;
        }
        res.json(task).pretty();
    });
});

app.delete('/api/tasks/:_id',function(req,res){
    var _id = req.params._id;
    Tasks.removeTask(_id,function (err,task) {
        if(err){
            throw err;
        }
        res.json(task);
    });
});




app.get('/api/tasks/:_id',function(req,res){
    Tasks.getTaskById(req.params._id,function (err,task) {
        if(err){
            throw err;
        }
        res.json(task);
    })
});


app.listen(3000);
console.log("Serving on port 3000");
