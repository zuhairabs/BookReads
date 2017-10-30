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
    console.log('updateGlobalShelf')

      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.concat([book])
      }));
    }

    addNewBook = (book,shelf) => {
      book.shelf = shelf
      this.setState((prevState) => {
        prevState.books.push(book)
      })
    }

    componentDidMount() {
      console.log('getBooks')
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
              />
        )}/>
        <Route path='/search' render={() => (
            <SearchBooks
              currentBooks={books}
              updateGlobalShelf={this.addNewBook}
              />
          )}/>
      </div>
    )
  }
}

export default BooksApp;
