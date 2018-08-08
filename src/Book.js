import React from "react";
class Book extends React.Component {
  render() {
    const { updateBook, book } = this.props;
    return (
      <select
        value={book.shelf}
        onChange={event => updateBook(event.target.value, book)}>
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
}
export default Book;
