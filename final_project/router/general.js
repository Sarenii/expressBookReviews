const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 2));
  axios.get('https://example.com/books')
    .then(function(response) {
      const books = response.data;
      res.send(books);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send('Error retrieving books');
    });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // retrieve the ISBN from the request parameters
  const book = books.find((b) => b.isbn === isbn); // find the book with the matching ISBN

  if (!book) {
    res.status(404).send('Book not found'); // if no book is found, send a 404 status code with an error message
  } else {
    res.send(JSON.stringify(book, null, 2)); // send the book as a JSON string with indentation for neat display
  }
  axios.get(`https://example.com/books/${isbn}`)
    .then(function(response) {
      const book = response.data;
      res.send(book);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send('Error retrieving book');
    });
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author; // retrieve the author from the request parameters
  const authorBooks = [];

  for (const book of books) {
    if (book.author === author) {
      authorBooks.push(book); // add the book to the list of books by the requested author
    }
  }

  if (authorBooks.length === 0) {
    res.status(404).send('No books found by this author'); // if no books are found, send a 404 status code with an error message
  } else {
    res.send(JSON.stringify(authorBooks, null, 2)); // send the list of books by the requested author as a JSON string with indentation for neat display
  }
  axios.get(url)
    .then(response => {
      const books = response.data;
      const filteredBooks = books.filter(book => book.author === author);
      res.send(filteredBooks);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title; // retrieve the title from the request parameters
  const book = books.find((b) => b.title === title); // find the book with the matching title

  if (!book) {
    res.status(404).send('Book not found'); // if no book is found, send a 404 status code with an error message
  } else {
    res.send(JSON.stringify(book, null, 2)); // send the book as a JSON string with indentation for neat display
  }
  axios.get(url)
    .then(response => {
      const books = response.data;
      const filteredBooks = books.filter(book => book.title === title);
      res.send(filteredBooks);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // retrieve the ISBN from the request parameters
  const bookReviews = reviews.filter((review) => review.isbn === isbn); // filter the book reviews to get only the ones for the requested ISBN

  if (bookReviews.length === 0) {
    res.status(404).send('No reviews found for this book'); // if no reviews are found, send a 404 status code with an error message
  } else {
    res.send(JSON.stringify(bookReviews, null, 2)); // send the book reviews as a JSON string with indentation for neat display
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
