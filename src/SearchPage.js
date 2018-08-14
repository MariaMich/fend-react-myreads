import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
//The Search Page will show when the user clicks on the button on the Home Page
//It is supposed to search through the list of books and find one that matches your search
class SearchPage extends React.Component {
  state = {
    results: [],
    query: ""
  };
  //the order of which the books show on the shelf
  shelfOrder = books => {
    let SearchBooks = this.props.books;
    books.forEach(book => {
      book.shelf = "none";
      SearchBooks.forEach(SearchBook => {
        if (book.id === SearchBook.id) {
          book.shelf = SearchBook.shelf;
        }
      });
    });
    return books;
  };
  search = value => {
    if (value.length) {
      BooksAPI.search(value).then(books => {
        if (books.length > 0) {
          books = this.assignShelf(books);
          this.setState(() => {
            return { results: books };
          });
        } else {
          this.setState({ results: [] });
          console.error("Term is not in the list of books");
        }
      });
    }
  };
  //Adding books to shelves
  BookAddition = (book, shelf) => {
    this.props.onChange(book, shelf);
    book.shelf = shelf;
    this.forceUpdate();
  };
  //The method that handles the variable's change
  variableUpdate = event => {
    let variable = event.target.variable;
    this.setState(() => {
      return { query: variable };
    });
    this.search(variable);
  };
  //render function
  render() {
    //return method
    return (
      //Search bar
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title/author"
              variable={this.state.query}
              onChange={this.VariableUpdate}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 &&
              this.state.results.map((book, index) => (
                //Search results under the bar in the search page
                <Book
                  book={book}
                  key={index}
                  updateBook={shelf => {
                    this.BookAddition(book, shelf);
                  }}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;
