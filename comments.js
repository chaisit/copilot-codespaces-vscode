// Create web server using node.js and express
// This is a simple web server that serves static files from a directory and handles POST requests
// The POST request handler is used to add comments to the comments.json file
// The comments are stored in the comments.json file and are read from the file each time the page is loaded
// The comments are displayed in a list on the page
// The comments are added to the comments.json file using a POST request

var express = require('express'); // include the express module
var app = express(); // create an app using express
var fs = require('fs'); // include the file system module
var bodyParser = require('body-parser'); // include the body-parser module

// use body-parser to process data from POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// use express to serve static files from public directory
app.use(express.static('public'));

// create a route for the app
app.get('/comments', function(req, res) {
    
    // read the contents of the comments.json file
    fs.readFile(__dirname + '/comments.json', function(err, data) {
        
        // send the contents of the file to the client
        res.send(data);
    });
});

// create a route for the app
app.post('/comments', function(req, res) {
    
    // read the contents of the comments.json file
    fs.readFile(__dirname + '/comments.json', function(err, data) {
        
        // parse the contents of the file into a JavaScript object
        var comments = JSON.parse(data);
        
        // add the new comment to the comments array
        comments.push(req.body);
        
        // write the contents of the comments array back to the file
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
            
            // send the contents of the file to the client
            res.send(comments);
        });
    });
});

// start the server
app.listen(3000, function() {
    console.log('Listening on port 3000');
});