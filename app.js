// APP.JS

/**
  Require statements allow us to import necessary modules for our application.
  The most common types of modules are third-party packages found on NPM.
 **/
var express         = require('express');
var path            = require('path');
// body-parser parses incoming request bodies, like values submitted through
// HTML forms. We can then retrieve those values with the  req.body property.
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var mongoose        = require('mongoose');
mongoose.connect('mongodb://localhost/tasks-app');

/**
  Other common types of require statements include local modules and files
  such as models and routes. The paths used are relative to the file that makes the call.
 **/

// Import application models stored in separate files. See individual model
// files for in-depth details and conventions about creating model schemas.
var Task        = require('./models/task');

// Import application routes stored in separate files. See individual route
// files for in-depth explanations on RESTful routing and conventions.
var taskRoutes  = require('./routes/tasks');

// if the environment variable, PORT, is present, sets variable equal to PORT
// otherwise, sets variable equal to an arbitrarily chosen port (7070 in this case)
// to view the application in locally, visit localhost:7070 when the server is running
var port = process.env.PORT || 7070;

var app = express();

/**
  app.set()
 **/

// Sets the default path location for our HTML view files.
app.set('views', path.join(__dirname, 'views'));

// Sets the application views' default file type to 'ejs' (embedded JS).
// The app will automatically expect all view files to be of type .ejs,
// which will allow us to omit the file extension when referencing view
// pages in our routes (see route files).
app.set('view engine', 'ejs');

/**
  app.use()
 **/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/tasks', taskRoutes);


/**
  app.listen() creates a server and listens for connections at the provided
  path. The first argument passed in should be the port. The second, optional,
  argument is typically a callback function used to provide feedback during in
  development indicating our server is running properly.
 **/
app.listen(port, function(){
  console.log('>> Dreams are realized on port ' + port);
});