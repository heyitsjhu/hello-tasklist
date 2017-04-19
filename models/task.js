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

module.exports = mongoose.model('Task', TaskSchema);