import React, { useEffect, useRef, useState } from 'react'
import { useBooksControllerContext } from '../../controller/BooksController';

export default function CollectListBooks({ books }) {

  const { bookState, dispatch } = useBooksControllerContext();
  const [readElement, setReadElement] = useState("");
  const [notification, setNotification] = useState("");

  const readBook = (id) => {
    const element = `book-${id}`;
    if (document.getElementById(element).innerHTML === "On the shelf") {
      dispatch({ type: "READBOOK", payload: id });
      setReadElement(element);
    }
  }

  useEffect(() => {
    const handleResolvedState = (resolvedState) => {
      //console.log(resolvedState)
      bookState.then((resolvedState) => {
        if (resolvedState.read) {
          if (readElement) {
            document.getElementById(readElement).innerHTML = "Finished";
          }
        }

        if (resolvedState.notification) {
          setNotification(resolvedState.notification)
        }
      });
    };

     // If bookState is a Promise, wait for it to resolve
    if (Promise.resolve(bookState) === bookState) {
      bookState.then(handleResolvedState);
    }
  }, [bookState]);

  return (
    <div style={{ margin: "1em" }}>
      {
        notification && (<div class="alert alert-primary" role="alert">
          {notification}
        </div>)
      }
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Read</th>
          </tr>
        </thead>
        <tbody>

          {books && books.data ? (
            books.data.map((book) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <div className="form-check">
                    {book.read_at ? (
                      <div>
                        <input className="form-check-input" type="checkbox" checked /> <span>Finished</span>
                      </div>
                    ) :
                      <div>
                        <input
                          className="form-check-input"
                          id={`input-${book.id}`}
                          onChange={(e) => readBook(book.id)}
                          type="checkbox" />
                        <span id={`book-${book.id}`}>On the shelf</span>
                      </div>
                    }
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
