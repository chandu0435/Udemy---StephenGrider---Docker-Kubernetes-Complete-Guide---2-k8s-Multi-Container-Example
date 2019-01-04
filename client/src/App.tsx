import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Fibonacci from './Fibonacci';
import OtherPage from './OtherPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                        <Link to='/'>Home</Link>
                        <Link to='/otherpage'>Other Page</Link>
                    </header>
                    <div>
                        <Route exact path='/' component={Fibonacci} />
                        <Route path='/otherpage' component={OtherPage} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
