import React from 'react'
import avatar from './images/avatar.webp'
import book from './images/book.webp'
import {
    add
} from './math'
function Hello() {
    return (
        <>
            <h1>Hello React</h1>
            <img src={avatar} alt="avatar" />
            <img src={book} alt="book" />
            {
                add(2,1)
            }
        </>
    )
}

export default Hello