import React from 'react'
import { BrowserRouter as  Link } from 'react-router-dom'

const PageNotFound = () => (
    <div>
        <h1>Page Timed Out!</h1>
        <div>
            Sorry You have timed out in the middle of the transaction. Please
            try again. Click <Link to="/home"> Here</Link> to return to Home
            Page .
        </div>
    </div>
)

export default PageNotFound
