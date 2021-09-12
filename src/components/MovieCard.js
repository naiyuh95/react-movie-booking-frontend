import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../styles/MovieCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MovieCard(props) {
    const history = useHistory()

    const directToReserveSeatPage = (props) => {
        let path = `/selectSeatBooking/${props.name}`
        history.push({
            pathname: path,
            state: { data: props },
        })
    }

    return (
        <div>
            <Card className="Card">
                <Card.Img variant="top" src={props.movieLink} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                        <br />
                        <br />
                        Release Date: {props.releaseDate}
                    </Card.Text>
                    {props.ready === 'enable' && (
                        <Button
                            variant="primary"
                            onClick={() => directToReserveSeatPage(props)}
                        >
                            Book Ticket
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}

export default MovieCard
