import React, { createContext, useContext, useReducer } from 'react'
import BooksLogicV2 from '../model/BooksLogicV2';
import { Outlet, useNavigate } from "react-router-dom";
import { initialBooksState } from '../model/initialBooksState';

const BooksControllerV2Context = createContext(null);

export default function BooksControllerV2() {
    const navigate = useNavigate();

    const { getBooks, updateBook, createBook } = BooksLogicV2();

    const setBookToFinished = async (id) => {
        const result = await updateBook(id);
        return result;
    }

    const createBookFromPayload = async (state, book) => {
        if (!state instanceof Promise) return state;
        const awaitedState = await state;
        const result = await createBook(book);
        return { ...awaitedState, notification: result ? "Your book has been created" : "Something went wrong " };
    }

    const collectBooks = async (state) => {
        const result = await getBooks();
        return result;
    }

    const collectReadBook = async (state, books, read) => {
        if (!state instanceof Promise) return state;
        const awaitedState = await state;
        return { ...awaitedState, books: books, read: read };
    }

    const handleRequest = async (state, action) => {
        switch (action.type) {
            case "READBOOK":
                const id = action.payload;
                const read = await setBookToFinished(id);
                const books = await collectBooks();
                return collectReadBook(state, books, read);

            case "CREATEBOOK":
                const book = action.payload
                const created = await createBookFromPayload(state, book);
                navigate("/books");
                return created;

            case "LISTBOOKS":
                const result = await collectBooks();
                return { ...state, books: result };

            default:
                return state;
        }
    }

    const [bookState, dispatch] = useReducer(handleRequest, initialBooksState);


    return (
        <BooksControllerV2Context.Provider
            value={{
                bookState,
                dispatch,
            }}
        >
            <Outlet></Outlet>
        </BooksControllerV2Context.Provider>
    )
}

export const useBooksControllerV2Context = () => {
    return useContext(BooksControllerV2Context);
}
