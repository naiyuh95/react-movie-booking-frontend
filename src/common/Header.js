import React from 'react'
import {
    Navbar,
    Container,
} from 'react-bootstrap'
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Header() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Book Movie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
