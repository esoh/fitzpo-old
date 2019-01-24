import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

import './Profile.css';
import AuthService from '../auth/AuthService';

class Profile extends React.Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            profilePic: "",
            coverPhoto: "",
            firstName: "",
            lastName: "",
            age: "",
            bio: "",
            height: "",
            weight: "",
            goals: "",
            edit: false,
            upload: false,
            selectedFile: null,
            selectedCoverFile: null
        };
    }

    getProfile = () => {
        let token = this.Auth.getToken();
        fetch('/profiles/' + token.user.username)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    profilePic: data.img,
                    coverPhoto: data.coverPhoto,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    bio: data.bio,
                    height: data.height,
                    weight: data.weight,
                    goals: data.goals
                });
            })
    }

    saveProfile = () => {
        let token = this.Auth.getToken();
        fetch('/profiles', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: token.user.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                bio: this.state.bio,
                height: this.state.height,
                weight: this.state.weight,
                goals: this.state.goals
            })
        })
            .then(res => {
                this.getProfile();
                this.setState( {edit: false} );
            })
    }

    toggleEdit = () => {
        this.setState( {edit: !this.state.edit} )
    }

    toggleUpload = () => {
        this.setState( {upload: !this.state.upload} )
    }

    handleChangeFile = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    handleChangeCoverFile = event => {
        this.setState({
            selectedCoverFile: event.target.files[0]
        });
    }

    handleUpload = () => {
        this.toggleUpload();
        if (this.state.selectedFile !== null) {
            let imgName = this.state.profilePic
            if (imgName.length > 0) {
                imgName = imgName.slice(50)
            } else {
                imgName = "none"
            }
            const data = new FormData();
            data.append('image', this.state.selectedFile) /*need 'image' due to singleUpload initialization in users.js*/
            fetch('profiles/profile-pictures/' + this.Auth.getToken().user.username + "/" + imgName, {
                method: "POST", /*Must not set Content-Type header*/
                body: data })
                    .then(res => {
                        this.setState({selectedFile: null});
                        this.getProfile();
                    })
        }
    }

    handleCoverUpload = () => {
        if (this.state.selectedCoverFile !== null) {
            let imgName = this.state.coverPhoto
            if (imgName.length > 0) {
                imgName = imgName.slice(46)
            } else {
                imgName = "none"
            }
            const data = new FormData();
            data.append('cover-image', this.state.selectedCoverFile) /*need 'image' due to singleUpload initialization in users.js*/
            fetch('profiles/cover-photos/' + this.Auth.getToken().user.username + '/' + imgName, {
                method: "POST", /*Must not set Content-Type header*/
                body: data })
                    .then(res => {
                        this.setState({selectedCoverFile: null});
                        this.getProfile();
                    })
        }
    }

    handleChangeFirstName = event => {
        this.setState({
            firstName: event.target.value
        });
    }

    handleChangeLastName = event => {
        this.setState({
            lastName: event.target.value
        });
    }

    handleChangeAge = event => {
        this.setState({
            age: event.target.value
        });
    }

    handleChangeBio = event => {
        this.setState({
            bio: event.target.value
        });
    }

    handleChangeHeight = event => {
        this.setState({
            height: event.target.value
        });
    }

    handleChangeWeight = event => {
        this.setState({
            weight: event.target.value
        });
    }

    handleChangeGoals = event => {
        this.setState({
            goals: event.target.value
        });
    }

    // Look into benefits of didMount vs willMount
    componentWillMount() {
        if (/*!this.Auth.loggedIn()*/!this.props.loggedIn) {
            return <Redirect to='/login' />
        } else {
            this.getProfile();
        }
    }

    render() {
        if (/*!this.Auth.loggedIn()*/!this.props.loggedIn) {
            return <Redirect to='/login' />
        }
        return (
            <>
            <div className='main-container'>
                <div className='top-container'>
                    <img className='cover-photo' src={this.state.coverPhoto === "" ? "https://s3-us-west-1.amazonaws.com/gymmate-profile-pictures/1547795834565" : this.state.coverPhoto} alt="your cover pic">
                    </img>
                    <div className='upload'>
                        <input type="file" name="cover-image" onChange={this.handleChangeCoverFile}/>
                        <button onClick={this.handleCoverUpload}>Upload</button>
                    </div>
                    <div className="pic-container">
                        <img className='user' src={this.state.profilePic === "" ? "https://s3-us-west-1.amazonaws.com/gymmate-profile-pictures/1547795834565" : this.state.profilePic} alt="you profile pic"/>
                        <button className="update-btn" onClick={this.toggleUpload}>Update</button>
                    </div>
                </div>
                {this.state.upload && (
                    <div>
                        <input type="file" name="image" onChange={this.handleChangeFile}/>
                        <button onClick={this.handleUpload}>Upload</button>
                    </div>
                )}
                <span className='name'>{this.Auth.getToken().user.username}</span>
                {!this.state.edit ? (
                <>
                <p>{this.state.firstName + " " + this.state.lastName}</p>
                <p>{"age: " + this.state.age}</p>
                <p>{"bio: " + this.state.bio}</p>
                <p>{"height: " + this.state.height}</p>
                <p>{"weight: " + this.state.weight}</p>
                <p>{"goals: " + this.state.goals}</p>
                <button onClick={this.toggleEdit}>edit</button>
                </>
                ) : (
                <>
                {/*<form method="post" encType="multipart/form-data" action={"/users/profile-pictures/" + this.Auth.getToken().user.username}>
                    <input type="file" name="image" />
                    <input type="submit"/>
                </form>*/}
                <p>first name
                    <input value={this.state.firstName} onChange={this.handleChangeFirstName}/>
                </p>
                <p>last name
                    <input value={this.state.lastName} onChange={this.handleChangeLastName}/>
                </p>
                <p>age
                    <input value={this.state.age} onChange={this.handleChangeAge}/>
                </p>
                <p>bio
                    <input value={this.state.bio} onChange={this.handleChangeBio}/>
                </p>
                <p>height
                    <input value={this.state.height} onChange={this.handleChangeHeight}/>
                </p>
                <p>weight
                    <input value={this.state.weight} onChange={this.handleChangeWeight}/>
                </p>
                <p>goals
                    <input value={this.state.goals} onChange={this.handleChangeGoals}/>
                </p>
                <p></p>
                <button onClick={this.saveProfile}>save</button>
                <button onClick={this.toggleEdit}>cancel</button>

                </>
                )}
            </div>

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

Profile = connect(mapStateToProps)(Profile)

export default Profile;
