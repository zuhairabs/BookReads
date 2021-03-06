import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    details: PropTypes.object.isRequired,
    currentShelf: PropTypes.string
  }


  updateBookShelf = (newshelf) => {
    this.props.updateShelf(this.props.details,newshelf)
    BooksAPI.update({id: this.props.details.id},newshelf).then((response) => {
      console.log(response);
    })
  }


  render() {
    const { details } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url("${ details.imageLinks ? details.imageLinks.thumbnail: ''}")`
            }}
          />
          <div className="book-shelf-changer">
            <select defaultValue={this.props.currentShelf || details.shelf} onChange={(event) => this.updateBookShelf(event.target.value)}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{details.title}</div>
        <div className="book-authors">
          { details.authors && details.authors.map((a,index) => (
            <div key={index}>{a}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default Book
