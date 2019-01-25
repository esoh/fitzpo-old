import React from 'react'
import { SIGNUP_MODAL } from '../constants/modalTypes'
import { showModal } from '../common/modal/modalActions'
import { connect } from 'react-redux'
import './Home.css'

const Home = ({dispatch}) => {
    return (
        <div className="home">
            <div className="container home-content">
                <h1>Fitness for all.</h1>
                <h3>Start your fitness journey for free today.</h3>
                <button
                    className="btn-primary btn signup"
                    onClick={() => dispatch(showModal(SIGNUP_MODAL))}
                >Join Now</button>
            </div>
        </div>
    );
}

export default connect()(Home);
