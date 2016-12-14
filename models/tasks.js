var mongoose = require('mongoose');
var app= require('express')();

var taskSchema = mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    id: {
        type: Number,
       // required :true
    },
  complete:{
    type:Boolean,
    default: false
  }

});
var Tasks = module.exports = mongoose.model('tasks', taskSchema);

module.exports.getTasks = function(callback,limit){
       Tasks.find(callback).limit(limit);
};

module.exports.getTaskById = function(id,callback,limit){
    Tasks.findById(id, callback);
};

//Add task

module.exports.addTask = function(task,callback){
    Tasks.create(task,callback);
};

module.exports.updateTask = function(id,task,options,callback){
    var query={ _id:id};
    console.log(task);
    var update ={
        title: task.title,
        id: task.id,
        complete:task.complete
    };
    Tasks.findOneAndUpdate(query,update,options,callback);
};

module.exports.removeTask = function(id,callback){
    var query ={_id : id};
    Tasks.remove(query,callback);
};

