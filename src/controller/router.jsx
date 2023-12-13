import {
    createBrowserRouter,
} from "react-router-dom";
import Maincontroller from "./Maincontroller";
import BooksController from "./BooksController";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Maincontroller />,
        children: [
            {
                path: "/books",
                element: <BooksController method="list" />,
            },
            {
                path: "/books/create",
                element: <BooksController method="create" />,
            },
        ]
    }
]);



export default router;