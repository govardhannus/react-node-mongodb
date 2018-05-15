import React, { Component } from 'react';
import axios from 'axios';

//Components
import style from './Home.css';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
    };

    this.getMyLocation = this.getMyLocation.bind(this);
    this.navigateToEdit = this.navigateToEdit.bind(this)
  }

  navigateToEdit(latitude,longitude) {
    this.props.history.push('/camera/' +  latitude + '/' + longitude);
  }

  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  render() { 
    return (
      <div>
        <img src = {require('../assets/newimages.jpg')}onClick={this.navigateToEdit.bind(this,this.state.latitude,this.state.longitude)} className="newimage"></img>
      </div>
    )
  }
}