import React, {Component} from 'react';
import {Provider} from 'react-redux';

//Components
import Router from './routes/index'


class App extends Component {

    render() {
        return (
                <Router/>
        );
    }
}

export default App;