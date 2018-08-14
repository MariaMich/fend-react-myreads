import React from "react";
import Book from "./Book.js";

class Shelf extends React.Component {
  //The method that's called when a book changes shelves
  shelfNewMove = (book, shelf) => {
    this.props.ShelfUpdate(book, shelf);
  };

  render() {
    const books = this.props.books;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              //Book display in the Shelf that as a component shows up in the Home Page
              <Book
                book={book}
                key={index}
                updateBook={shelf => {
                  this.ShelfNewMove(book, shelf);
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
