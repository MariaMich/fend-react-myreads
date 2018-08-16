//Importing the dependencies and the components
import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import HomePage from "./HomePage.js";
import SearchPage from "./SearchPage.js";
import { Route } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.setBooksState();
  }
  //Method that updates the shelf when we move the book
  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setBooksState();
    });
  };
  //Method that prints the books and sets their state
  setBooksState() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }
  //render function
  render() {
    //return method
    return (
      //HomePage component
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <HomePage books={this.state.books} onChange={this.moveShelf} />
          )}
        />
        <Route
          //SearchPage Component
          path="/search"
          render={() => (
            <SearchPage books={this.state.books} onChange={this.moveShelf} />
          )}
        />
      </div>
    );
  }
}

export default App;
