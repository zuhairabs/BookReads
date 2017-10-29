import React, { Component } from 'react';
import Book from './Book.js'

class BookShelf extends Component {


  state = {
    shelf: this.props.shelf
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.state.shelf==="currentlyReading" && (
            'Currently Reading'
          )}
          {this.state.shelf==="wantToRead" && (
            'Want To Read'
          )}
          {this.state.shelf==="read" && (
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
