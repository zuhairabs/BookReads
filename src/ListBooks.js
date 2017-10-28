import React, { Component } from "react";
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf'

import * as BooksAPI from './BooksAPI.js'

class ListBooks extends Component {


  state = {
    books: [],
    shelves: ['wantToRead','currentlyReading','read']
  }

  filterBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => book.shelf === shelf)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelves.map((s,index) => (
              <BookShelf key={index} books={this.filterBooksByShelf(s)} shelf={s}/>
            ))}
          </div>
        </div>
        <Link
          to="/search"
          className="open-search">
          Add a book
        </Link>
      </div>
    )
  }
}

export default ListBooks;
