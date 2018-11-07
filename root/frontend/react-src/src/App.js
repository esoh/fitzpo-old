import React, { Component } from 'react';

import './App.css';
import Navbar from './common/Navbar'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default App;
