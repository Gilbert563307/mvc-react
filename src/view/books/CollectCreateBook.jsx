import React, { useRef, useState } from 'react'
import { useBooksControllerContext } from '../../controller/BooksController';

export default function CollectCreateBook() {

    const titleRef = useRef("");
    const authorRef = useRef("");

    const [notification, setNotification] = useState("");
    const { dispatch } = useBooksControllerContext();


    const createUsers = (event) => {
        event.preventDefault();
        const title = titleRef.current.value;
        const author = authorRef.current.value
        if (title == "" || author == "") {
            setNotification(`Ale velden zijn verplicht`);
        }
        const payload = { title: title, author: author }
        dispatch({ type: "CREATEBOOK", payload: payload });
    }

    return (
        <div>
            {notification && (<div class="alert alert-danger" role="alert">{notification} </div>)}
            <form className='d-flex mx-4 flex-column w-50' action='#'>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="title" ref={titleRef} className="form-control" />
                </div>
                <div className="mb-3">
                    <label for="author" className="form-label">Auhtor</label>
                    <input type="title" ref={authorRef} className="form-control" />
                </div>
                <div className="mb-3">
                    <input className="btn btn-primary" onClick={createUsers} type="submit" value="Create" />
                </div>
            </form>
        </div>
    )
}
