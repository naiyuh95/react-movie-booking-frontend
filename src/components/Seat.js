import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, Col, Row, Tab, Tabs, Button } from 'react-bootstrap'
import '../styles/Seat.css'
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard.js'
import { Square } from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css'

function Seat(props) {
    return (
        <div>
            {props.status === 'CONFIRMED' ? (
                <Button
                    style={{ backgroundColor: 'black' }}
                    className="seat"
                    disabled
                />
            ) : props.status === 'PENDING' ? (
                <Button
                    style={{ backgroundColor: 'purple' }}
                    className="seat"
                    disabled
                />
            ) : props.status === 'OPEN' && props.type === 'N' ? (
                <Button
                    onClick={() =>
                        props.onClick(
                            props.value,
                            props.status,
                            props.type,
                            props.name
                        )
                    }
                    style={{ backgroundColor: 'green' }}
                    className="seat"
                />
            ) : props.status === 'SELECTED' ? (
                <Button
                    onClick={() =>
                        props.onClick(
                            props.value,
                            props.status,
                            props.type,
                            props.name
                        )
                    }
                    style={{ backgroundColor: 'blue' }}
                    className="seat"
                />
            ) : props.status === 'OPEN' && props.type === 'V' ? (
                <Button
                    onClick={() =>
                        props.onClick(
                            props.value,
                            props.status,
                            props.type,
                            props.name
                        )
                    }
                    style={{ backgroundColor: 'yellow' }}
                    className="seat"
                />
            ) : (
                <Button
                    style={{ backgroundColor: 'red' }}
                    className="seat"
                    disabled
                />
            )}
        </div>
    )
}

Seat.propTypes = {
    value: PropTypes.number,
    toggleSelection: PropTypes.func,
}

export default Seat
