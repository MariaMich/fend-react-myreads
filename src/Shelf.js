import React from "react";
import Book from "./Book.js";

class Shelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <ol className="books-grid">
          <div className="book-shelf-changer">
            <Book
              updateBook={this.props.updateBook}
              selectionRequest={this.props.selectionRequest}
              book={Book}
            />
          </div>
        </ol>
      </div>
    );
  }
}
export default Shelf;
