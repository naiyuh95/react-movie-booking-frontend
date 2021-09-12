import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    Button,
    Form,
    Alert,
} from 'react-bootstrap'
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment'

function MovieCustomerInfoPage() {
    let history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const [emailValid, setEmailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [contactNumberValid, setContactNumberValid] = useState(false)
    const [timeOver, setTimeOver] = useState(false)
    const [modal, setModal] = useState(false)

    const location = useLocation()

    const [countDown, setCountDown] = useState(600)
    const countDownTime = useRef(null)

    const DirectToNextPage = () => {
        console.log('=====')
        console.log(history.location.state.seats)
        console.log(contactNumber)
        console.log('=====')
        history.push({
            pathname: '/seatConfirm',
            state: {
                ez: 'ez',
            },
        })
    }

    const validateEmail = (email) =>{

      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(email);

    }

    

    useEffect(() => {
        const countDownStart = () => {
            if (countDown > 0) {
                countDownTime.current = setInterval(() => {
                    setCountDown((countDown) => countDown - 1)
                }, 1000)
            } else {
                setTimeOver(true)
            }
        }
        countDownStart()
    }, [])

    const formatCountDownTimer = () => {
        const seconds = `0${countDown % 60}`.slice(-2)
        const minutes = `0${`${Math.floor(countDown / 60)}` % 60}`.slice(-2)

        return `${minutes} : ${seconds}`
    }

    const test = () => {
        console.log('adsdsads')
        console.log('adsdsads')
        console.log('adsdsads')
        console.log(location)
        console.log(location.state.movieName)
    }
    const getSeatsName = () => {
        var seatString = ''
        location.state.seatsName.map((seat) => {
            seatString = seatString + ',' + seat
        })
        return seatString.substring(1)
    }

    const convertToDate = (timestamp) => {
        return moment(timestamp).format('DD/MM/YYYY hh:mm A')
    }

    return (
        <div>
            Movie Customer Enter Particulars Page
            <Alert variant="danger">
                Please complete your transaction in {formatCountDownTimer()}.
                Pressing the BACK button or refreshing the page at any time
                during the confirm booking will invalidate your transaction.
            </Alert>
            <h1>
                Confirm Booking for {location.state.movieName} at{' '}
                {convertToDate(location.state.movieTime)}
            </h1>
            <br />
            <h3>Seats selected: {getSeatsName()}</h3>
            <br />
            <h5>Total Amount: ${location.state.price}</h5>
            <br />
            <br />
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(nameValue) =>
                            setName(nameValue.target.value)
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(emailValue) =>
                            setEmail(emailValue.target.value)
                        }
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type="Contact"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(contactNumberValue) =>
                            setContactNumber(contactNumberValue.target.value)
                        }
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={DirectToNextPage}
                >
                    Submit
                </Button>
                <Button variant="primary" onClick={test}>
                    test
                </Button>
            </Form>
        </div>
    )
}

export default MovieCustomerInfoPage
