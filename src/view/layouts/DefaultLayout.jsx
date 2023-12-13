import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function DefaultLayout() {
    return (
        <>
            <section style={{ display: "flex", gap: "1em" }}>
                <Link to={`/`}>Go to home</Link>
                <Link to={`books`}>Go to books</Link>
                <Link to={`books/create`}>create book</Link>
            </section >
            <section>
                <Outlet></Outlet>
            </section>
        </>
    )
}
