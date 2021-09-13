import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Container,
    Col,
    Row,
    Button,
    Spinner,
    Form,
    Alert,
    Table,
} from 'react-bootstrap'
import '../styles/MovieSeatSelectionPage.css'
import Seat from './Seat.js'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

function MovieMainPage() {
    let history = useHistory()
    const location = useLocation()
    const vipTixPrice = 20
    const normTixPrice = 10
    //states for checking status for each seat and storing selected seats
    const [seatsStatus, setSeatsStatus] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedSeatsName, setSelectedSeatsName] = useState([])

    //state for alert if failure
    const [failure, setFailure] = useState(false)

    //state for showing components
    const [isLoading, setIsLoading] = useState(false)
    const [isHide, setIsHide] = useState(false)

    //states for storing data
    const [denyList, setDenyList] = useState([])
    const [movieList, setMovieList] = useState([])
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('0')

    //for pricing
    const [normTixAmount, setNormTixAmount] = useState(0)
    const [vipTixAmount, setVipTixAmount] = useState(0)

    //seatRows
    const [seatRows, setSeatRows] = useState([])



    
    useEffect(() => {
      
        const fetchMovieList = async () => {
                //load dropdown
            if(location.state == undefined || location.state == null || location.state == ''){
              history.push("/PageNotFound");   
            }else{
              const result = await axios(
                `http://localhost:8082/booking/getAllMoviesByName/${location.state.data.name}`
              ).then(function (result) {
                  setMovieList(result.data['List of Movies'])
              })
            }

        }

        fetchMovieList()
    }, [])

    useEffect(() => {
        const fetchSeatsData = async () => {
            if (selectedTimeSlot !== '0') {
                setIsLoading(true)
                //API call

                const result = await axios(
                    `http://localhost:8082/booking/getSeatsByMovieId/${parseInt(
                        selectedTimeSlot
                    )}`
                ).then(function (result) {
                    var manipulatedSeats = result.data['List of Seats']

                    //reset deny list and selectedSeats with each render
                    var denyTmp = []
                    setSelectedSeats([])
                    setSelectedSeatsName([])
                    setSeatRows([])
                    setNormTixAmount(0)
                    setVipTixAmount(0)
                    var seatRowsTmp = []
                    var obj = {}
                    var counter = 64
                    manipulatedSeats.forEach(function (seat, idx) {
                        if (
                            seat['reservationList'][0]['Reservation Status'] !==
                            'OPEN'
                        ) {
                            obj[seat['Seat ID No.']] =
                                seat['reservationList'][0]['Reservation Status']
                        }

                        if ((idx + 1) % 6 === 0) {
                            counter++
                            seatRowsTmp.push(counter)
                        }
                    }, [])

                    denyTmp.push(obj)
                    setDenyList(denyTmp)
                    setSeatRows(seatRowsTmp)

                    //sort and prepare seat for render
                    manipulatedSeats = manipulatedSeats.sort(function (a, b) {
                        return a['Seat Number'] - b['Seat Number']
                    })

                    setSeatsStatus(manipulatedSeats)
                    setIsLoading(false)
                })
            }
        }

        
        fetchSeatsData()
    }, [selectedTimeSlot])

    const toggleSelection = (seatId, status, type, seatName) => {
        if (status === 'OPEN' && denyList.indexOf(seatId) !== 0) {
            setSelectedSeats((selectedSeats) => [...selectedSeats, seatId])

            setSelectedSeatsName((selectedSeatsName) => [
                ...selectedSeatsName,
                seatName,
            ])

            type === 'N'
                ? setNormTixAmount(normTixAmount + 1)
                : setVipTixAmount(vipTixAmount + 1)
        } else if (status === 'SELECTED') {
            setSelectedSeats((selectedSeats) =>
                [...selectedSeats].filter((item) => item != seatId)
            )
            setSelectedSeatsName((selectedSeatsName) =>
                [...selectedSeatsName].filter((item) => item != seatName)
            )
            type === 'N'
                ? setNormTixAmount(normTixAmount - 1)
                : setVipTixAmount(vipTixAmount - 1)
        }
    }

    const checkStatus = (seatId) => {
        if (parseInt(seatId) in denyList[0]) {
            return denyList[0][seatId]
        } else if (selectedSeats.indexOf(parseInt(seatId)) !== -1) {
            return 'SELECTED'
        } else {
            return 'OPEN'
        }
    }

    //for booking
    const reserveAndBlockSeats = () => {
        axios
            .post('http://localhost:8082/booking/reserveSeat', {
                seats: selectedSeats,
            })
            .then(function (response) {
                history.push({
                    pathname: '/inputInfoForSeatBooking',
                    state: {
                        seats: selectedSeats,
                        price: normTixAmount * 10 + vipTixAmount * 20,
                        movieTime:
                            movieList[getMovieIndex(selectedTimeSlot)][
                                'start time'
                            ],
                        movieName:
                            movieList[getMovieIndex(selectedTimeSlot)]['name'],
                        seatsName: selectedSeatsName,
                        movieLink: movieList[getMovieIndex(selectedTimeSlot)]['poster link'],
                    },
                })
            })
            .catch(function (error) {
                setFailure(true)
            })
    }

    const checkStatuses = () => {
        console.log(movieList[getMovieIndex(selectedTimeSlot)]['start time'])
    }

    const getMovieIndex = () => {
        var index = 0
        movieList.map((movie, idx) => {
            if (movie['Movie ID No.'] === parseInt(selectedTimeSlot)) {
                console.log(idx)
                index = idx
            }
        })
        return index
    }

    const convertToDate = (timestamp) => {
        return moment(timestamp).format('DD/MM/YYYY hh:mm A')
    }

    return (
        <div className="page">
            <Container className="main-container">
                Page of Movie
                <br />
                <br />
                {failure && (
                    <Alert variant="danger">
                        The seats selected has already been reserved, please
                        refresh the page and try again.
                    </Alert>
                )}
                <Form.Select
                    className="dropdown"
                    as="select"
                    value={selectedTimeSlot}
                    onChange={(e) => {
                        setSelectedTimeSlot(e.target.value)
                        e.target.value === '0'
                            ? setIsHide(true)
                            : setIsHide(false)
                    }}
                >
                    <option value="0">Show Movie Timings</option>
                    {movieList.map((movie) => (
                        <option value={(movie['Movie ID No.'] + '').toString()}>
                            {convertToDate(movie['start time'])}
                        </option>
                    ))}
                </Form.Select>
                <br />
                <br />
                <br />
                <Container className="screen-container">
                    <Row>
                        <Col sm={4}>
                            <Container className="row-index">
                                {!isLoading && !isHide && (
                                    <Row gutter={40}>
                                        {seatRows.map((num) => (
                                            <Col xl={{ span: 10 }}>
                                                Row {String.fromCharCode(num)}
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </Container>
                        </Col>
                        <Col sm={8}>
                            
                            <Container className="screen-box">
                                {isLoading && (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </Spinner>
                                )}

                                {!isLoading && selectedTimeSlot==='0'&&(
                                    "No Movies Selected.."
                                )}

                                {!isLoading && !isHide && (
                                    <Row gutter={40}>
                                        {seatsStatus.map((seat) => (
                                            <Col lg={{ span: 2 }}>
                                                <Seat
                                                    className
                                                    value={seat['Seat ID No.']}
                                                    name={seat['Seat Name']}
                                                    type={seat['Seat Type']}
                                                    status={checkStatus(
                                                        seat['Seat ID No.']
                                                    )}
                                                    onClick={toggleSelection}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Container className="legend-box">
                    <Row gutter={40}>
                        <Col lg={{ span: 2 }}>Legend:</Col>
                        <Col lg={{ span: 2 }}>
                            <Button
                                style={{ backgroundColor: 'green' }}
                                disabled
                            />{' '}
                            Available
                        </Col>
                        <Col lg={{ span: 2 }}>
                            <Button
                                style={{ backgroundColor: 'yellow' }}
                                disabled
                            />{' '}
                            <br />
                            VIP Available Seat
                        </Col>
                        <Col lg={{ span: 2 }}>
                            <Button
                                style={{ backgroundColor: 'blue' }}
                                disabled
                            />{' '}
                            Selected
                        </Col>
                        <Col lg={{ span: 2 }}>
                            <Button
                                style={{ backgroundColor: 'purple' }}
                                disabled
                            />{' '}
                            Blocked
                        </Col>
                        <Col lg={{ span: 2 }}>
                            <Button
                                style={{ backgroundColor: 'black' }}
                                disabled
                            />{' '}
                            Confirmed
                        </Col>
                        <Col lg={{ span: 2 }}></Col>

                        <Col lg={{ span: 2 }}>
                            <Button
                                style={{ backgroundColor: 'red' }}
                                disabled
                            />{' '}
                            Unable to book
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Table striped bordered hover variant="dark" className="table">
                    <thead>
                        <tr className="seatTableTitle">
                            <th className="seatType">Seat Type</th>
                            <th className="seatPrice">Ticket Price</th>
                            <th className="seatQty">Qty</th>
                            <th className="seatTotal">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vipTixAmount > 0 && (
                            <tr>
                                <td>VIP</td>
                                <td>${vipTixPrice}</td>
                                <td>{vipTixAmount}</td>
                                <td>${vipTixAmount * vipTixPrice}</td>
                            </tr>
                        )}
                        {normTixAmount > 0 && (
                            <tr>
                                <td>Normal</td>
                                <td>${normTixPrice}</td>
                                <td>{normTixAmount}</td>
                                <td>${normTixAmount * normTixPrice}</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="3">Total Amount To Pay</td>
                            <td>
                                $
                                {vipTixAmount * vipTixPrice +
                                    normTixAmount * normTixPrice}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {selectedSeats.length > 0 ? (
                    <Button onClick={reserveAndBlockSeats}>
                        Continue to fill in your particulars{' '}
                    </Button>
                ) : (
                    'Please select a seat'
                )}
                <Button onClick={checkStatuses}>test </Button>
            </Container>
        </div>
    )
}

export default MovieMainPage
