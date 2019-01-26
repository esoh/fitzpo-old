import React from 'react'
import { SIGNUP_MODAL } from '../constants/modalTypes'
import { showModal } from '../common/modal/modalActions'
import { connect } from 'react-redux'
import Hero from './Hero'
import './Home.css'

function Home(props) {
    return (
        <div className="home">
            <Hero
                title="Fitness for all."
                subtitle="Start your fitness journey for free today."
                buttonClick={props.openSignup}
                buttonText="Join Now"
            />
            <Hero
                title="Find your fitness plan."
                subtitle="Made for the community, by the community."
                linkText="Browse Programs"
                link="/programs"
            />
            <Hero
                title="Discover new exercises."
                subtitle="Watch. Learn. Do. For beginner or experts alike."
                linkText="Browse Exercises"
                link="/exercises"
            />
            <Hero
                title="Track your progress."
                subtitle="You train, we think."
                linkText="Get Started"
                link="/signup"
            />
        </div>
    );
}

export default connect(null,
    dispatch => {
        return {
            openSignup: () => {dispatch(showModal(SIGNUP_MODAL))}
        }
    }
)(Home);
