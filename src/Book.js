import React from "react";

class Book extends React.Component {
  ComponentDidMount() {
    console.log("Book mounted");
  }

  ShelfPage(book) {
    return (
      <select onShelfMove={this.ShelfMove} value={book.shelf}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }

  thumbnail(book) {
    if (!book.imageLinks) {
      book.imageLinks = [];
      book.imageLinks.smallThumbnail = "http://via.placeholder.com/128x158";
      book.imageLinks.thumbnail =
        "http://via.placeholder.com/128x188?text=no+cover";
    }
  }

  BookPage(book) {
    return (
      <div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }

  ShelfUpdate = e => {
    this.props.onUpdate(e.target.value);
  };

  render() {
    const book = this.props.book;
    console.log(book);
    this.thumbnail(book);

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              //How the book displays (inside a shelf {which is inside the home page})
              className="book-cover"
              title={book.description}
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
            <div className="book-shelf-changer">{this.ShelfPage(book)}</div>
          </div>
          {this.BookPage(book)}
        </div>
      </li>
    );
  }
}

export default Book;
