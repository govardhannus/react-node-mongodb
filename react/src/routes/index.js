import React, {Component} from 'react';
import {Route, BrowserRouter,Redirect} from 'react-router-dom';

//components
import Home from '../container/Home'
import Camera from '../container/Camera'

class index extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/camera/:latitude/:longitude" component={Camera}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default index;