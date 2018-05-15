import React, { Component } from 'react';
import axios from 'axios';

//Components
import style from './Home.css';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            traffic: [],
        };
    }

    componentDidMount() {

        const { latitude , longitude } = this.props.match.params

        axios.get('http://localhost:3000/getdata', { params: { "latitude": latitude, "longitude": longitude } })
            .then(response => this.setState({
                traffic: response.data.customers
            })).catch(error =>
                console.log(error)
            )

    }

    render() {
        console.log(this.props, 'props');
        return (
            <div>
                <div className="headerContainer">Trafic Camera</div>
                <div>
                    {
                        this.state.traffic.map((traffic) => {
                            return (
                                <div className="productContainer">
                                    <img src={traffic.ImageLink} className="image"></img>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>

        )
    }

}