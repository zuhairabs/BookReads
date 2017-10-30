import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import BookShelf from './BookShelf'

class ListBooks extends Component {

  static PropTypes = {
    currentBooks: PropTypes.array.isRequired,
    setBooks: PropTypes.func.isRequired,
    updateGlobalShelf: PropTypes.func.isRequired
  }


  state = {
    shelves: ['currentlyReading','wantToRead','read']
  }

  filterBooksByShelf = (shelf) => {
    return this.props.currentBooks.filter((book) => book.shelf === shelf)
  }

  componentWillMount() {
    this.props.setBooks()
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
              <BookShelf
                key={index}
                books={this.filterBooksByShelf(s)}
                shelf={s}
                updateGlobalShelf={this.props.updateGlobalShelf}/>
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
