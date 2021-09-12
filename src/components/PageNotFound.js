import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const PageNotFound = () => (
    <div>
        <h1>404 - Not Found!</h1>
        <div>
            Sorry, the page you requested was not found. Click
            <Link to="/home"> Here</Link> to return to Home Page .
        </div>
    </div>
)

export default PageNotFound
