import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MovieConfirmModal(props) {
    let history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const confirm = () => {
        console.log('=====')
        console.log(email)
        console.log(password)
        console.log('=====')
    }

    return (
        <div>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Movie Booking</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Your Name: {props.name}</p>
                    <p>Your Email: {props.email}</p>
                    <p>Your Phone Number: {props.number}</p>
                    <p>Your Seats: {props.seats}</p>
                    <p>Total Price: {props.price}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">
                        Return to edit your information
                    </Button>
                    <Button variant="primary" onClick={() => confirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default MovieConfirmModal
