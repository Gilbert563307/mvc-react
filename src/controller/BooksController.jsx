import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import CollectListBooks from "../view/books/CollectListBooks";
import CollectCreateBook from "../view/books/CollectCreateBook";
import BooksLogic from '../model/BooksLogic';
import { useNavigate } from "react-router-dom";


const initialState = {
    notification: "",
    read: false,
}

const BooksControllerContext = createContext(null);

export default function BooksController({ method = "list" }) {
    const navigate = useNavigate();
    const [view, setView] = useState("");

    const ListBooks = async () => {
        const result = await BooksLogic.fetchData();
        return result;
    }

    const setBookToFinished = async (state, id) => {
        const result = await BooksLogic.updateBook(id);
        return { ...state, read: result ? true : false };
    }

    const createBookFromPayload = async (state, book) => {
        const result = await BooksLogic.createBook(book);
        return { ...state, notification: result ? "Your book has been created" : "Something went wrong " };
    }

    const handleRequest = async (method) => {
        switch (method) {
            case "list":
                const books = await ListBooks();
                setView(<CollectListBooks books={books} />)
                break;
            case "create":
                setView(<CollectCreateBook />)
                break;

            default:
                break;
        }
    }

    const handleDispatch = async (state, action) => {
        switch (action.type) {
            case "READBOOK":
                const id = action.payload;
                const read = await setBookToFinished(state, id);
                return read;

            case "CREATEBOOK":
                const book = action.payload
                const created = await createBookFromPayload(state, book);
                navigate("/books", { method: "list" });
                return created;

            default:
                return state;
        }
    }

    const [bookState, dispatch] = useReducer(handleDispatch, initialState);

    useEffect(() => {
        handleRequest(method);
    }, [method])

    return (
        <BooksControllerContext.Provider
            value={{
                bookState,
                dispatch,
            }}
        >
            {view}
        </BooksControllerContext.Provider>
    )
}

export const useBooksControllerContext = () => {
    return useContext(BooksControllerContext);
}
