import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import PropTypes from 'prop-types'


import Book from './Book.js'

import * as BooksAPI from './BooksAPI.js'

class SearchBooks extends Component {
  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
    setBooks: PropTypes.func.isRequired
  }

  state = {
    searchResults: [],
    query: ''
  }

  updateQuery = (query) => {

    this.setState({query: query})

    if (query==='') {
      this.setState({searchResults: []})
      return
    }

    BooksAPI.search(query,20).then((results) => {
      if (this.state.query===query && results) {
        console.log(results)
        this.setState({searchResults: results});
      } else {
        this.setState({searchResults: []})
      }
    })
  }

  updateSearchShelf = () => {
    console.log("ok");
  }

  getBookSelf = (bookid) => {
    if (this.props.currentBooks.filter((b) => b.id === bookid).length > 0) {
      return this.props.currentBooks.filter((b) => b.id === bookid)[0].shelf
    } else {
      return "none"
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.props.setBooks(books)
    })
  }


  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
                />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.constructor===Array && this.state.searchResults.map((b) => (
              <li key={b.id}>
                <Book
                  details={b}
                  updateShelf={this.updateSearchShelf}
                  currentShelf={this.getBookSelf(b.id)}
                  />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
