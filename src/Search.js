import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Search extends React.Component {
  state = {
    SearchDisplay: []
  };
  searchQuery = query => {
    if (query !== "") {
      BooksAPI.search(query).then(books => {
        if (!books || books.error) this.setState({ SearchDisplay: [] });
        else {
          books.map(foundBook => {
            this.props.books.forEach(book => {
              if (foundBook.id === book.id) {
                foundBook.shelf = book.shelf;
              } else {
                foundBook.shelf = "none";
              }
            });
            return foundBook;
          });

          this.setState({ SearchDisplay: books });
        }
      });
    } else {
      this.setState({ SearchDisplay: [] });
    }
  };
  render() {
    const { SearchDisplay } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to={`/`}
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title/author"
              value={this.props.query}
              onChange={event => this.searchQuery(event.target.value)}
            />
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.SearchDisplay &&
                this.state.SearchDisplay.map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 188,
                            backgroundImage:
                              book.imageLinks === undefined
                                ? `url(http://via.placeholder.com/128x193?text=No%20Cover)`
                                : `url(${book.imageLinks.thumbnail})`
                          }}
                        />
                        <div className="book-shelf-changer">
                          <Book
                            book={book}
                            updateBook={this.props.updateBook}
                          />
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.author}</div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
