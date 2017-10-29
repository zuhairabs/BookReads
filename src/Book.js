import React, { Component } from 'react';

class Book extends Component {


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
            <select value={details.shelf}>
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
