import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'


import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  updateGlobalShelf = (book,shelf) => {
      this.setState((prevState) => {
        prevState.books.filter((b)=>b.id===book.id)[0].shelf = shelf
      })
    }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    const {books} = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <ListBooks
              currentBooks={books}
              updateGlobalShelf={this.updateGlobalShelf}
              setBooks={this.getBooks}/>
        )}/>
        <Route path='/search' render={() => (
            <SearchBooks
              currentBooks={books}
              setBooks={this.getBooks}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp;
