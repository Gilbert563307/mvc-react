import {
    createBrowserRouter,
} from "react-router-dom";
import Maincontroller from "./Maincontroller";
import BooksControllerV2 from "./BooksControllerV2";
import CollectCreateBookV2 from "../view/books/CollectCreateBookV2";
import CollectListBooksV2 from "../view/books/CollectListBooksV2";

const routerV2 = createBrowserRouter([
    {
        path: "/",
        element: <Maincontroller />,
        children: [
            {
                path: "/books",
                element: <BooksControllerV2 />,
                children: [
                    {
                        path: "",
                        element: <CollectListBooksV2 />,
                    },
                    {
                        path: "/books/create",
                        element: <CollectCreateBookV2 />,
                    },
                ]
            },

        ]
    }
]);



export default routerV2;