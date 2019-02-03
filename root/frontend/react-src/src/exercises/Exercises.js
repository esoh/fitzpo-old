import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Exercises.css';
import { connect } from 'react-redux'

class Exercises extends React.Component{
    constructor() {
        super();
        this.state = {
            searchValue: "",
            nameValue: "",
            descriptionValue: "",
            exercises: null
        }
    }

    handleChangeSearch = event => {
        this.setState({
            searchValue: event.target.value
        });
    }

    handleSearch = () => {
        let name = this.state.searchValue
        if (!name) {
            name = "zqww9" // (temp fix) dummy value to indicate that the search is empty since it has problems with the request and an empty string
        }
        fetch('/exercises/' + name)
            .then(res => res.json())
            .then(data => {
                this.setState( {exercises: data.exercise} )
            })
    }

    handleChangeName = event => {
        this.setState({
            nameValue: event.target.value
        });
    }

    handleChangeDescription = event => {
        this.setState({
            descriptionValue: event.target.value
        })
    }

    handleCreate = () => {
        fetch('/exercises', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({name:this.state.nameValue, description:this.state.descriptionValue})
        })
            .then(res => {
                this.setState({
                    nameValue: "",
                    descriptionValue: ""
                });
                this.handleSearch();
            })
    }

    ExerciseList = (props) => {
        const exercises = props.exercises
        const listExercises = exercises.map((exercise, i) =>
            <tr key={i}>
                <td className="text-left" key={exercise.name}>{exercise.name}</td>
                <td className="text-left" key={exercise.description}>{exercise.description}</td>
                {this.props.loggedIn && (
                    <td>
                        <div name={exercise._id} className="trash" onClick={this.handleDelete}>
                            <FontAwesomeIcon icon="trash"/>
                        </div>
                    </td>
                )}
            </tr>
            //<li>{exercise.name + ' ' + exercise.description}</li>
        );
        return (
            <table className="table-fill">
                <tbody className="table-hover">
                    <tr>
                        <th className="text-left">Exercise</th>
                        <th className="text-left">Description</th>
                    </tr>
                    {listExercises}
                </tbody>
            </table>
        )
    }

    handleDelete = event => {
        fetch('/exercises/' + event.currentTarget.getAttribute("name"), {
            method: "DELETE"
        })
            .then(res => {
                res.json()
                this.handleSearch()
            });
    }

    handleEnterSearch = event => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    componentDidMount() {
        this.handleSearch();
    }

    render() {
        return (
            <div className='exercises-contanier'>
                <div className='search'>
                    <input className="search-box" placeholder="Exercise Name" onChange={this.handleChangeSearch} value={this.state.searchValue} onKeyPress={this.handleEnterSearch}/>
                    <button className="search-btn" onClick={this.handleSearch}>Search</button>
                </div>
            {/*<div className="table-title">
                    <h3>Exercises</h3>
                </div>*/}

                {this.state.exercises && (
                    <this.ExerciseList exercises={this.state.exercises} />
                )}

                {this.props.loggedIn && (
                <div className='create'>
                    <input placeholder="Exercise Name" value={this.state.nameValue} onChange={this.handleChangeName}/>
                    <div></div>
                    <textarea placeholder="Description" value={this.state.discription} onChange={this.handleChangeDescription}/>
                    <div></div>
                    <button onClick={this.handleCreate}>Create</button>
                </div>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

Exercises = connect(mapStateToProps, null)(Exercises)

export default Exercises;
