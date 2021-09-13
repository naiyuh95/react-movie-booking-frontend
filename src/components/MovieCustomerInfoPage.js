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
import axios from 'axios'

function MovieCustomerInfoPage() {
    let history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const [emailValid, setEmailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [contactNumberValid, setContactNumberValid] = useState(false)


    //state for alert if failure
    const [failure, setFailure] = useState(false)
    const [failureMessage, setFailureMessage] = useState("")
    const location = useLocation()

    const [countDown, setCountDown] = useState(100)
    const countDownTime = useRef(null)

    const DirectToNextPage = () => {
        axios
        .post('http://localhost:8082/booking/confirm', {
            seats: location.state.seatsName,
            customer: location.state.seatsName,
            seatNames: location.state.seatsName,
            totalAmount: location.state.price,
            moviePosterLink: location.state.movieLink,
            movieName: location.state.movieName,
        })
        .then(function (response) {
            history.push({
                pathname: '/seatConfirm',
                
            })
        })
        .catch(function (error) {
            setFailure(true)
            console.log(error);
            if(error.response.data.message === "Database error"){
                setFailureMessage("Error Occured, email must be unique")
            }else{
                setFailureMessage("Error occured, please try again later or go back to movie page.")
            }
            
        })
    }

    const Test = () => {
        axios
        .post('http://localhost:8082/booking/confirm', {
            seats: [7,8],
            customer: {
                "customerName": "aaaaaaaa",
                "contactNumber":91234567,
                "email": "ny_gth@hotmail.com"
                        },
            seatNames: ["A1","B2"],
            totalAmount: 50,
            moviePosterLink: "https://backend-movie-pic.s3.ap-southeast-1.amazonaws.com/dune.jpg",
            movieName: "Dune"
        })
        .catch(function (error) {
            setFailure(true)
            console.log(error);
            if(error.response.data.message === "Database error"){
                setFailureMessage("Error Occured, email must be unique")
            }else{
                setFailureMessage("Error occured, please try again later or go back to movie page.")
            }
            
        })
    }

    const validateEmail = (email) =>{

      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(email);

    }



    useEffect(() => {
        const countDownStart = () => {
            if(location.state === undefined || location.state === null || location.state === ''){
              history.push("/PageNotFound");   
            }
            if(countDown === 0){
                history.push({
                    pathname: '/timeout'
                })
            }else{
                
                countDownTime.current = setInterval(() => {
                    setCountDown((countDown) => countDown - 1)
                }, 1000)
            }

           
            

        }
        countDownStart()
    }, [])

    useEffect(() => {
        const countDownStart = () => {
            if(countDown === 0){
                history.push({
                    pathname: '/timeout'
                })
            }
        }
        
        countDownStart()
    }, [countDown])


    const formatCountDownTimer = () => {
        const seconds = `0${countDown % 60}`.slice(-2)
        const minutes = `0${`${Math.floor(countDown / 60)}` % 60}`.slice(-2)

        return `${minutes} : ${seconds}`
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
            <br/>
            <br/>
            {failure && (
                    <Alert variant="danger">
                        {failureMessage}
                    </Alert>
                )}
            {(location.state !== undefined && location.state !== null && location.state !== '') &&
              <h1>
                  Confirm Booking for { location.state.movieName} at{' '}
                  {convertToDate(location.state.movieTime)}
              </h1>
            }
              <br />
            {(location.state !== undefined && location.state !== null && location.state !== '') &&
            <h3>Seats selected: {getSeatsName()}</h3>
            }
              <br />
              {(location.state !== undefined && location.state !== null && location.state !== '') &&
              <h5>Total Amount: ${location.state.price}</h5>
              }         
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
                    Confirm
                </Button>
                <Button variant="primary" onClick={Test}>
                    test
                </Button>
            </Form>
        </div>
    )
}

export default MovieCustomerInfoPage
