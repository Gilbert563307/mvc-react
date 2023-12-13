// import { createContext, useContext, useEffect, useState } from "react";
// import BooksLogic from "../model/BooksLogic";

// const BooksContext = createContext({
//     books: [],
//     book: {},
//     setBooks: () => { },
//     setBook: () => { },
// });

// export const BooksContextProvider = ({ children }) => {
//     const [book, setBook] = useState([])
//     const [books, setBooks] = useState({});

//     const BooksLogicInstance = BooksLogic();

//     useEffect(() => {
//         setBooks(BooksLogicInstance.listAllBooks());
//     }, []);

//     return (
//         <BooksContext.Provider value={{
//             books,
//             book,
//             setBooks,
//             setBook,
//         }}>
//             {children}
//         </BooksContext.Provider>
//     )


// }

// export const useBookStateContext = () => useContext(BooksContext);