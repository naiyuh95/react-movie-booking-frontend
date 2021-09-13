import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Tab, Tabs } from 'react-bootstrap'
import moment from 'moment'
import '../styles/MovieMainPage.css'
import axios from 'axios'
import MovieCard from './MovieCard.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function MovieMainPage() {
    //states for movies
    const [moviesList, setMoviesList] = useState([])
    const [nowShowing, setNowShowing] = useState(0)
    const [comingSoon, setComingSoon] = useState(0)

    useEffect(() => {
        const getMovieList = async () => {
            //API call
            const result = await axios(
                'https://hack-it-submission-backend-ny.herokuapp.com/booking/getAllMovies'
            ).then(function (result) {
                var movieList = []
                var resultListTmp = result.data['List of Movies']
                resultListTmp.filter(function (movie) {
                    var i = movieList.findIndex(
                        (movieToFilter) =>
                            movieToFilter['name'] === movie['name'] &&
                            movieToFilter['release date'] ===
                                movie['release date']
                    )
                    if (i <= -1) {
                        movieList.push(movie)
                        if (
                            moment(
                                movie['release date'],
                                'YYYY-MM-DD'
                            ).isSameOrBefore(moment().add(1, 'M'))
                        ) {
                            setNowShowing(nowShowing + 1)
                        } else {
                            setComingSoon(comingSoon + 1)
                        }
                    }
                    return null
                })

                setMoviesList(movieList)
            })
        }
        getMovieList()
    }, [])

    return (
        <div>
            <Tabs
                defaultActiveKey="Now Showing"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Now Showing" title="Now Showing">
                    <Container className="flex-container">
                        <Row>
                            {nowShowing === 0
                                ? 'No Movies at the moment'
                                : moviesList.map(
                                      (movie) =>
                                          moment(
                                              movie['release date'],
                                              'YYYY-MM-DD'
                                          ).isSameOrBefore(
                                              moment().add(1, 'M')
                                          ) && (
                                              <Col xs>
                                                  <MovieCard
                                                      name={movie['name']}
                                                      movieLink={
                                                          movie['poster link']
                                                      }
                                                      description={
                                                          movie['description']
                                                      }
                                                      releaseDate={
                                                          movie['release date']
                                                      }
                                                      ready="enable"
                                                  />
                                              </Col>
                                          )
                                  )}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                    <Container className="flex-container">
                        <Row>
                            {comingSoon === 0
                                ? 'No Movies at the moment'
                                : moviesList.map(
                                      (movie) =>
                                          moment(
                                              movie['release date'],
                                              'YYYY-MM-DD'
                                          ).isAfter(moment().add(1, 'M')) && (
                                              <Col xs>
                                                  <MovieCard
                                                      name={movie['name']}
                                                      movieLink={
                                                          movie['poster link']
                                                      }
                                                      description={
                                                          movie['description']
                                                      }
                                                      releaseDate={
                                                          movie['release date']
                                                      }
                                                      ready="disabled"
                                                  />
                                              </Col>
                                          )
                                  )}
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
            {/* <Button onClick = {testAPI}>Test</Button> */}
        </div>
    )
}

export default MovieMainPage
