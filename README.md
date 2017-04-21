# Hello, Tasklist

A sample tasklist application built with Node.js and Express. Chock-full of in-file comments, this app is meant to be a reference guide for complete beginners. I did my best to explain the purpose of each line of Node.js and Express code.

To view a working demo of the application, click here.

## Local Setup

Clone the project. In order to run the applcation locally, you will need to have Node.js and MongoDB installed on your computer.

### Install Node.js

Download Node [here](https://nodejs.org/en/download/).

### Install MongoDB

Go [here](https://docs.mongodb.com/manual/administration/install-community/) and select the tutorial for your operating system.

### Install NPM Modules

Navigate to the project's root folder and use `npm install` in your command line to install the necessary NPM modules.

### Seed Database

In `app.js`, find the line with `seedDB();`—it should be a comment—and uncomment it. When you launch the server, this will create sample task entries in your application. **Every time the server is launched, `seedDB()` will wipe the database and re-seed, so make sure you comment out this line if re-seeding is not your intention.**

### Start Server

In the command line, run `node app.js` from root to launch your application.
