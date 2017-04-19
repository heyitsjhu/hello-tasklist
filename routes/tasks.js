// ROUTES/TASKS.JS

/**
  Require the Express NPM module. Whenever you need to use the features and
  functionalities of an NPM or local module in one of your application's
  files, you need to require that module within the file itself. Here, we
  require Express because we need to use its Router() method.
 **/
var express = require('express');

/**
  Express' Router() method lets us create modular, mountable route handlers.
  The code below creates an instance of Router and assigns it to the variable,
  router. Because a Router instance is a complete middleware and routing
  system, we can now use 'router' to define our task routes.
 **/
var router  = express.Router();

/**
  Require our application's Task model. This gives us the mongoose features
  needed to create, retrieve, modify, and delete tasks from our database.
  Notice the double-periods (..), tells our app to look traverses up in our
  app's file structure, from /routes into the root folder, then into the
  /models folder. And finally, pointing to the task file within the folder.
 **/
var Task    = require('../models/task');

/******************************************************************************
  ACTION  ||  HTTP VERB  ||  URL PATH       ||  DESCRIPTION
*******************************************************************************
  Index   ||  GET        || /tasks          ||  Display a list of tasks
  New     ||  GET        || /tasks/new      ||  Show form for creating new task
  Create  ||  POST       || /tasks          ||  Create a new task
  Show    ||  GET        || /tasks/:id      ||  Display a specific task
  Edit    ||  GET        || /tasks/:id/edit ||  Show form for editing a task
  Update  ||  PUT        || /tasks/:id      ||  Update a specific task
  Destroy ||  DELETE     || /tasks/:id      ||  Delete a specific task
******************************************************************************/

// GET REQUEST TO SHOW ALL TASKS
router.get('/', function(req, res){
  /**
    The mongoose find() method looks at the tasks table in our database and
    will retrieve every entry matching the conditions we pass into the first
    argument. In this case, we pass in an empty object, {}, signifying we
    want to retrieve the entire collection of tasks.

    Next, we pass in a callback function as the second argument. The callback
    function itself takes two parameter: an error and the results of the
    Task.find() method.
   **/
  Task.find({}, function(err, foundTasks){

    // If there's an error, handle the error.
    if(err){
      res.send(err.message);
    }

    // If there are no errors, the following code is executed.
    // Render the tasks index page and pass the collection of tasks retrieved
    // from the database to a variable named tasks which can be used in the
    // specified render view file—— in this case, our /tasks/index.ejs file.
    res.render('tasks/index', {tasks: foundTasks});
  });
});

// GET REQUEST TO SUBMIT A NEW TASK
router.get('/new', function(req, res){
  /**
    res.render() sends a response to the client that renders a view template.
    In this case, the index.ejs file inside /views/tasks/ is rendered. Recall,
    in APP.JS, we set our default views path to 'views' and our default view
    engine to .ejs, which means we can omit them from our declaration. This is
    why, instead of saying res.render('../views/tasks/index.ejs'), we can
    simply use res.render('tasks/index').
  **/
  res.render('tasks/new');
});

// POST REQUEST TO CREATE A NEW TASK
router.post('/', function(req, res){
  // We assign the value retrieved from the NEW form to a local task variable.
  // Thanks to body-parser, the value(s) submitted through the form can be
  // retrieved using the req.body property. In this case, req.body returns
  // {content: <value>}. 'content' here matches the 'name' property in our
  // form's input field. And <value> is whatever's entered and submitted
  // into this particular input field.
  var task = req.body;

  /**
    The mongoose create() method will attempt to create a new instance of Task
    with the properties passed into the first argument. Here, we are using the
    data retrieved from the NEW form and stored in our local task variable.

    We also pass in a callback function ot the second argument, similar to what
    we did in the index route with the find() method. We first handle any error
    that may occur, moving on only when no errors exist. The second argurment in our callback function will contain our instance of Task, properties and all.
   **/
  Task.create(task, function(err, newTask){
    if(err){
      res.send(err.message);
    }

    // Save our instance of Task to the database.
    newTask.save();
    console.log(newTask);
    // Redirect the user to newly created task's SHOW page.
    res.redirect('/tasks/' + newTask._id);
  });
});

// GET SHOW PAGE FOR AN EXISTING TASK
router.get('/:id', function(req, res){
  /**
    The mongoose findById() method will search the database for a task whose ID
    matches the value passed into the first argument. Notice that our route for
    the show page uses what is known as a URL parameter, which is preceded by a colon——in our case, it's :id. It's important to note that 'id' here is arbitrary, meaning we can call it whatever we like. However, it's best
    practice to name it something meaningful that reflects the type of data it
    represents.

    When a request is made to a page matching this URL pattern, the value that is in place of :id will be stored in a params hash stored in the request. The params hash will then contain a property with the same name as the one we named our URL parameter (id, in our case), whose value will match the value in the actual URL.

    For example, if I were to visit /tasks/someIdString, I can retrieve that value using the params hash, req.params.id, where 'id' is the name of the URL parameter we set in our route.
   **/
  Task.findById(req.params.id, function(err, foundTask){
    if(err){
      res.send(err.message);
    }

    // Render the tasks show page and pass the task matching the ID from
    // the URL request to the variable, task, making it available in the
    // show template.
    res.render('tasks/show', {task: foundTask});
  });
});

// GET EDIT PAGE FOR EXISTING TASK
router.get('/:id/edit', function(req, res){
  // Look for task in database whose ID matches the one stored in req.params.id
  Task.findById(req.params.id, function(err, foundTask){
    if(err){
      res.send(err.message);
    }

    // Render the task edit page and pass the found task to the variable,
    // task. Our task can then be accessed through this variable in the EDIT
    // page.
    res.render('tasks/edit', {task: foundTask});
  });
});

// UPDATE AN EXISTING TASK
router.put('/:id', function(req, res){
  /**
    The mongoose findByIdAndUpdate() method works just like the findById()
    method, with the added functionality of updating the record it finds. In
    addition to the ID argument, this method takes a second argument——the data
    we want to update our existing task with.

    Note that we are using req.body.task here. This is because in our EDIT form
    we set our input field's 'name' property equal to 'task[content]'. What
    this does is create a container——in our case, task——for our data. This is particularly useful when we have a form with multiple input fields that all
    belong to a similar grouping.

    For example, if we had a user form that collected information such as first
    name, last name, and email, and wrapped each input field's 'name' property
    with a container name, like 'user'——i.e., user[firstName], user[lastName], and user[email]——we can retrieve all of that information by just calling
    req.body.user.

    Doing so would return a value in line with the following:

      {
        firstName:  'Johnny',
        lastName:   'Tsunami',
        email:      'johnny@example.com'
      }

    As you can see, this approach saves having to retrieve each input field
    individually, which can become tedious for extremely long forms.
   **/
  Task.findByIdAndUpdate(req.params.id, req.body.task, function(err, updatedTask) {
    if(err) {
      res.send(err.message);
    }
    // Redirect to the updated task's SHOW page.
    res.redirect('/tasks/' + updatedTask._id);
  });
});

// DELETE AN EXISTING TASK
router.delete('/:id', function(req, res){
  /**
    The mongoose findByIdAndRemove() method looks for a task in the database
    whose ID matches the value passed in to the first argument and removes that
    record from the database.
   **/
  Task.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.send(err.message);
    }
    res.redirect('/tasks');
  });
});

/**
  In JS, creating modules is a very common practice. Basically, whenever you
  come across a situation where you have a bunch of related code that can be
  extracted into its own file, you'll want to create a module and encapsulate
  that chunk of code. Creating an Express routing system specific to our tasks is one such case, which is why we've extracted the chunk of code above into its own file (this file).

  In order for the rest of our application to have access to our task routes,
  we need to make it available by assigning it to the module.exports object.
 **/
module.exports = router;

/**
  Now, other files throughout our application can access the routes defined
  in this file as long as these files include this JS file using the require
  statement.

  However, the most common place to access route files is by importing them
  from the application's main file——in our case, from APP.JS. If you look at
  our APP.JS file, you'll notice that we do just that. We require our task
  routes file and assign it to the variable, taskRoutes. And then, further down
  in APP.JS, you'll see that we then instruct our applcation to use these
  defined routes with the specified URL prefix.
 **/