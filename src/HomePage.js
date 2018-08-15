import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf.js";
import "./App.css";

class HomePage extends React.Component {
  render() {
    const ShelfDisplay = [
      {
        type: "currentlyReading",
        name: "Currently Reading"
      },
      {
        type: "wantToRead",
        name: "Want to Read"
      },
      {
        type: "read",
        name: "Read"
      }
    ];
    const books = this.props.books;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {ShelfDisplay.map(shelf => (
              <Shelf
                //How the shelf is displayed in the Home Page
                key={shelf.type}
                books={books.filter(book => book.shelf === shelf.type)}
                name={shelf.name}
                moveShelf={this.props.onChange}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}
export default HomePage;

