import Header from './common/Header.js'
import './App.css'
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import MovieMainPage from './components/MovieMainPage.js'

import MovieSeatSelectionPage from './components/MovieSeatSelectionPage.js'
import MovieCustomerInfoPage from './components/MovieCustomerInfoPage.js'
import MovieSeatConfirmationPage from './components/MovieSeatConfirmationPage.js'
import PageNotFound from './components/PageNotFound.js'
import PageTimeOver from './components/PageTimeOver.js'

function App() {
    return (
        <div className="App">
            <Router>
                <Header />

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" component={MovieMainPage} />
                    <Route
                        exact
                        path="/selectSeatBooking/:movieName"
                        component={MovieSeatSelectionPage}
                    />
                    <Route
                        exact
                        path="/inputInfoForSeatBooking"
                        component={MovieCustomerInfoPage}
                    />
                    <Route
                        exact
                        path="/seatConfirm"
                        component={MovieSeatConfirmationPage}
                    />
                    <Route
                        exact
                        path="/timeout"
                        component={PageTimeOver}
                    />
                    <Route
                        exact
                        path="/PageNotFound"
                        component={PageNotFound}
                    />
                    
                    <Route exact component={PageNotFound} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
