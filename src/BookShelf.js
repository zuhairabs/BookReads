import React, { Component } from 'react';
import Book from './Book.js'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateGlobalShelf: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelf==="currentlyReading" && (
            'Currently Reading'
          )}
          {this.props.shelf==="wantToRead" && (
            'Want To Read'
          )}
          {this.props.shelf==="read" && (
            'Read'
          )}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((b) => (
              <li key={b.id}>
                <Book
                  details={b}
                  updateShelf={this.props.updateGlobalShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
