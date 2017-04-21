var mongoose = require('mongoose');
var Task = require('./models/task');

var sampleTasks = [
  {
    content: "Get a much needed haircut"
  },
  {
    content: "Finish writing that blog entry I've been putting off."
  },
  {
    content: "Take the dogs our for a nice, long walk."
  },
  {
    content: "Restock on good ol' black gold—caffeine!"
  },
  {
    content: "Pay off the credit card... cards."
  },
  {
    content: "Do a few pushups. Preferably, more than a few."
  },
  {
    content: "Create a web development portfolio."
  },
  {
    content: "Attend some local Meetups and meet new friends!"
  }
];


var seedDB = function() {
  Task.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log('The database has been wiped clean.');

    sampleTasks.forEach(function(task){
      Task.create(task, function(err, newTask){
        if(err){
          console.log(err);
        } else {
          console.log('Sample task created successfully.');
        }
      });
    });
  });
}

module.exports = seedDB;