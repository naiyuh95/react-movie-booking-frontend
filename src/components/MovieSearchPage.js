import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Tab, Tabs, Button } from 'react-bootstrap'
import '../styles/Header.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MovieCard from './MovieCard.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function MovieSearchPage() {
    //states for movies
    const [moviesList, setMoviesList] = useState([])
    const [user, setUser] = useState(undefined)

    return <div>Movie Search page</div>
}

export default MovieSearchPage
