import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Search from "./Search.js";
import Shelf from "./Shelf.js";
import { Link, Route } from "react-router-dom";

class ReadsApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().catch(error =>
      console.error("Failed to fetch books", error)
    );
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      console.log("ReadsApp mounted");
    });
  }

  updateBook = (Shelf, Book) => {
    let result = [];
    BooksAPI.update(Shelf, Book).then(() => {
      Book.shelf = Shelf;
      result = this.state.books.filter(filtered => filtered.id !== Book.id);
      this.setState({ books: result.concat(Book) });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path={`/`}
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <h3 className="bookshelf-title">Currently Reading</h3>
                  <Shelf
                    title="currentlyReading"
                    book={this.state.books}
                    updateBook={this.updateBook}
                  />

                  <h3 className="bookshelf-title">Want to Read</h3>
                  <Shelf
                    title="wantToRead"
                    books={this.state.books}
                    updateBook={this.updateBook}
                  />

                  <h3 className="bookshelf-title">Read</h3>
                  <Shelf
                    title="read"
                    books={this.state.books}
                    updateBook={this.updateBook}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to={`/search`}>Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              searchQuery={this.searchQuery}
              updateBook={this.updateBook}
            />
          )}
        />
      </div>
    );
  }
}
export default ReadsApp;
