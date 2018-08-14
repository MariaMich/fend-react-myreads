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
  //Message that will be showed when the app.js runs correctly
  componentDidMount() {
    this.setBooksState();
  }
  //Method that updates the shelf when we move the book
  ShelfUpdate = (book, shelf) => {
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
            <HomePage books={this.state.books} onChange={this.ShelfUpdate} />
          )}
        />
        <Route
          //SearchPage Component
          path="/SearchPage"
          render={() => (
            <SearchPage books={this.state.books} onChange={this.ShelfUpdate} />
          )}
        />
      </div>
    );
  }
}

export default App;
