import React, { useState, useEffect } from "react";
import Book from "../components/UI/Book";

const Books = ({ books, loading }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  function filterBooks(filter) {
    let sorted = [...books];

    if (filter === "LOW_TO_HIGH") {
      sorted.sort(
        (a, b) =>
          (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice),
      );
    }
    if (filter === "HIGH_TO_LOW") {
      sorted.sort(
        (a, b) =>
          (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice),
      );
    }
    if (filter === "RATING") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    setFilteredBooks(sorted); 
  }

  if (loading) {
    return <div className="books__loading">Loading...</div>;
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <section>
          <div className="books__container">
            <div className="row">
              <div className="books__header">
                <h2 className="section__title books__header--title">
                  All Books
                </h2>
                <select
                  id="filter"
                  defaultValue="DEFAULT"
                  onChange={(event) => filterBooks(event.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="LOW_TO_HIGH">Price, Low to High</option>
                  <option value="HIGH_TO_LOW">Price, High to Low</option>
                  <option value="RATING">Rating</option>
                </select>
              </div>
              <div className="books">
                {filteredBooks.map((book) => (
                  <Book book={book} key={book.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Books;
