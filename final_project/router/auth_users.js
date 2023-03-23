const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body; // retrieve the username and password from the request body using destructuring

  // check if the username and password are provided in the request body
  if (!username || !password) {
    res.status(400).send('Please provide both username and password'); // if not, send a 400 status code with an error message
    return;
  }

  // check if the username already exists in the list of users
  if (users.find((user) => user.username === username)) {
    res.status(409).send('Username already exists'); // if so, send a 409 status code with an error message
    return;
  }

  // add the new user to the list of users and save it to the users.json file (assuming synchronous write operation)
  users.push({ username, password });
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

  res.status(201).send('User registered successfully'); // send a 201 status code with a success message
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn; // retrieve the ISBN from the request parameters
  const { review } = req.query; // retrieve the review from the request query
  const username = req.session.username; // retrieve the username from the session

  // check if the review is provided in the request query
  if (!review) {
    res.status(400).send('Please provide a review'); // if not, send a 400 status code with an error message
    return;
  }

  // check if the user has already posted a review on the same ISBN
  const existingReview = reviews.find((review) => review.isbn === isbn && review.username === username);

  if (existingReview) {
    existingReview.review = review; // if so, modify the existing review with the new review
  } else {
    // if not, add a new review to the list of reviews
    reviews.push({ isbn, review, username });
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
