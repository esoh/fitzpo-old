import React from 'react'
import { Link } from 'react-router-dom'

function Hero(props){
    return (
        <div className="hero">
            <div className="container home-content">
                <h1>{props.title}</h1>
                <h3>{props.subtitle}</h3>
                {props.buttonClick && props.buttonText ? (
                    <button
                        className="btn btn-primary"
                        onClick={props.buttonClick}
                    >
                        {props.buttonText}
                    </button>
                ) : (
                    null
                )}
                {props.link && props.linkText ? (
                    <Link to={props.link}>{props.linkText}</Link>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default Hero
