// APP.JS

/**
  Dotenv is a zero-dependency module that loads environment variables from a
  .env file into process.env. This keeps sensitive information like OAUTH and
  API keys safe from the public—especially in open-source projects.
 **/
require('dotenv').config();

/**
  Require statements allow us to import necessary modules for our application.
  The most common types of modules are third-party packages found on NPM.
 **/
var express         = require('express');

// The path module provides utilities for working with file and directory
// paths.
var path            = require('path');

// body-parser parses incoming request bodies, like values submitted through
// HTML forms. We can then retrieve those values with the  req.body property.
var bodyParser      = require('body-parser');

// method-override lets us use HTTP verbs, such as PUT and DELETE, where they
// are not available——for example, in HTML forms.
var methodOverride  = require('method-override');

// connect-flash allows us to set useful messages we can then display back to
// the user.
var flash           = require('connect-flash');

/**
  Mongoose provides a straight-forward, schema-based solution to model your
  application data and connect it to a MongoDB database.
  Tutorials for setting up MongoDB locally can be found here:
  https://docs.mongodb.com/manual/administration/install-community/
 **/
var mongoose        = require('mongoose');

// The mongoose connect() method opens a connection between our application
// and our database. The following points to a local MongoDB database named
// 'tasks-app'.
// mongoose.connect('mongodb://localhost/tasks-app');
mongoose.connect('mongodb://'+ process.env.MONGODB_USER + ':' + process.env.MONGODB_PW + '@ds139899.mlab.com:39899/tasklist-sample-app');

/**
  Alternatively, you can use a database-as-a-service provider, such as mLab
  (https://mlab.com/), to store your application's data. The URI provided by
  mLab looks something like this:
         mongodb://<dbuser>:<dbpassword>@ds012345.mlab.com:56789/mydb
  where <dbuser> and <dbpassword> reflects the authorized user you assign to
  the database and 'mydb' is the name of your database.
 **/

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

// Import sample task data that can be used to seed the database. View the
// seeds.js file in the root directory for more info.
var seedDB      = require('./seeds')

/**
  Assigns the environment variable PORT, if present, to the variable, port,
  otherwise sets an arbitrary value——in this case, 7070. This variable is
  later assigned to Express' listen() method which creates and listens to
  for connections at the provided port.
 **/
var port = process.env.PORT || 7070;

/**
  Seeds the database with sample data whenever the server starts.
  NOTE: This function will wipe the database prior to seedning, so
  if that's not your intention, make sure you comment this out after
  your first seed, so it doesn't erase any new data you submit while
  using the application.
 **/
// seedDB();

// A common convention is to assign Express to a variable, named app.
// This makes the code more expressive and easier to read (referring
// to app as opposed to express just makes more sense!).
var app = express();

/**
  Express' app.set() method assigns the first argument, the name, to the
  second argument, the value. In our sample application, we will use two
  properties, 'views' and 'view engine', from Express' app settings table
  (https://expressjs.com/en/api.html#app.settings.table).
 **/

// Sets the default path location for our HTML view files. __dirname refers
// to the directory in which our executing script resides——in our case, APP.JS.
app.set('views', path.join(__dirname, 'views'));

/**
  Sets the application views' default file type to 'ejs' (embedded JS).
  The app will automatically expect all view files to be of type .ejs,
  which will allow us to omit the file extension when referencing view
  pages in our routes (see route files).
 **/
app.set('view engine', 'ejs');

/**
  Express' app.use() method mounts middleware function(s) at the specified
  path. The first argument is the path for which the middleware function is
  invoked. Subsequent arguments are any number of callback functions. These
  mounted middleware is executed every time the base of the requested path
  matches path.
 **/

// The path.join() method joins all given path segments together using
// the platform specific separator as a delimiter, then normalizes the
// resulting path.
app.use(express.static(path.join(__dirname, 'public')));

/**
  Only parses urlencoded bodies, returning the parsed data as key-value pairs
  inside the req.body object. The "extended" syntax, which uses the qs
  library allows for rich objects and arrays to be encoded into the
  URL-encoded format, allowing for a JSON-like experience with URL-encoded.
  For more info, see: https://www.npmjs.com/package/qs#readme
 **/
app.use(bodyParser.urlencoded({ extended: true }));

/**
  Specify a query string key as an argument that can then used to extract the
  HTTP VERB we want to use (i.e., PUT or DELETE). Here, we're using the
  arbitrary string, '_method'. You can name it anything but always try to pick
  a name that best represents its purpose and functionality. To see this
  method in action, please view the 'views/tasks/edit.ejs' file.
 **/
app.use(methodOverride('_method'));


/**
  express-session is a middleware that lets us set session ID data on the server-side. For our purposes, a sessions is necessary when storing flash messages, which is why we're using it here.
 **/
app.use(require('express-session')({
  // used to sign the session ID. Can be a string or an array of strings.
  secret: 'lynx point siamese',

  // if true, forces the session to be saved even if a change wasn't made.
  resave: false,

  // if true, forces an uninitialized—a new but not modified—session to be saved.
  saveUninitialized: false
}));

app.use(flash());

/**
  Local response variables can be used to store information. The variables are
  reassigned every time there's a new request made to the application. Here,
  we're storing flash messages to local variables, flashSuccess and
  flashError, which are then accessible in our views.
  NOTE: This section should come BEFORE the inclusion of your routes.
 **/
app.use(function(req, res, next){
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});


// Mount the routes assigned to our taskRoutes variable to the path, '/tasks'.
// This approach automatically prepends '/tasks' to all routes defined within
// our 'routes/tasks' route file.
app.use('/tasks', taskRoutes);

// This route retrieves the root page of the application.
app.get('/', function(req, res){
    res.render('index');
});

/**
  app.listen() creates a server and listens for connections at the provided
  path. The first argument passed in should be the port. The second, optional,
  argument is typically a callback function used to provide feedback during in
  development indicating our server is running properly.
 **/
app.listen(port, function(){
  console.log('>> Dreams are realized on port ' + port);
});