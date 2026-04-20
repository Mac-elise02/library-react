import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books as booksData } from "./data";
import BookInfo from "./pages/BookInfo";
import React, { useState, useEffect } from "react";
import Cart from "./pages/Cart";

function App() {
  //books + loading state
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBooks(booksData);
      setLoading(false);
    }, 1000);
  }, []);

  function addBookToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item,
      ),
    );
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home books={books} loading={loading} />} />
          <Route
            path="/books"
            element={<Books books={books} loading={loading} />}
          />
          <Route
            path="/books/:id"
            element={
              <BookInfo
                books={books}
                addBookToCart={addBookToCart}
                cart={cart}
                loading={loading}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
