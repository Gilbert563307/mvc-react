import useCustomCollectBooksHook from '../../customHooks/useCustomCollectBooksHook'

export default function CollectListBooksV2() {

  const { customState, dispatch } = useCustomCollectBooksHook();

  const readBook = (bookId) => {
    dispatch({ type: "READBOOK", payload: bookId });
  }

  return (
    <div style={{ margin: "1em" }}>
      {
        customState.notification && (<div class="alert alert-primary" role="alert">
          {customState.notification}
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

          {customState.books && customState.books ? (
            customState.books.data.map((book) => (
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
  )
}
