// MODELS/TASKS.JS

// Require Mongoose library in order to use its features.
var mongoose = require('mongoose');

/**
  Create a new mongoose Schema and assign it to the variable, TaskSchema.
  The schema accepts an object containing key-type pairs, where the key
  defines a property and the value defines the SchemaType, or a nesting of
  key-type pairs.
  Read more about schemas here: http://mongoosejs.com/docs/guide.html
 **/

var TaskSchema = new mongoose.Schema(
  // Object that defines the shape of our schema.
  {
    // The key-type pair here defines a property called 'content' that is
    // of the SchemaType, String.
    content: String,

    /**
      This key-type pair defines a property called 'completed' whose value
      is a nested object containing further key/type definitions.
      Essentially, this reads along the lines of, "The property, completed,
      has a SchemaType of boolean and a default value of false."
     **/
    completed: {type: Boolean, default: false}
  },

  /**
    Two common properties present in data models are ones that track when an
    entry was created and updated. We can accomplish this by passing in a
    second argument that sets timestamps to true. Now, everytime a new task
    persists in our database, it's create and update times are included
    automatically under the createdAt and updatedAt properties.
   **/
  {timestamps: true}
);


/**
  Here's an example of what our model's schema looks like upon persistence:
    { __v: 0,
      updatedAt: 2017-04-19T01:55:46.137Z,
      createdAt: 2017-04-19T01:55:46.137Z,
      content: 'Go to sleep!',
      _id: 58f6c3a21c31b40499624c0c,
      completed: false
    }
 **/

/**
  In JS, creating modules is a very common practice. Basically, whenever you
  come across a situation where you have a bunch of related code that can be
  extracted into its own file, you'll want to create a module that encapsulates
  that chunk of code. Creating a mongoose schema for our Task model is one such
  case, which is why we've extracted the chunk of code above into its own file
  (this file).

  In order for the rest of our application to have access to our Task model,
  we need to make it available by assigning it to the module.exports object.
 **/

module.exports = mongoose.model('Task', TaskSchema);

/**
  The line of code above does the following:
    * moogoose.model() compiles our model schema.
      * the first argument is the SINGULAR name of the collection, Task.
        (Mongoose automatically looks for the PLURAL version, tasks, in the database.)
      * the second argument is our model's schema, which we assigned to the
        variable, TaskSchema. So, we simply pass that variable in.
    * this newly compiled Task model is then assigned to the module.exports
      object, making it available in other parts of our application, so long
      that include this JS file using the require statement in the other files.

      For example, we include this file in our routes/tasks.js file because we
      utilize the model's features to create, modify, and delete tasks based on
      the requests that come through our routes.
 **/