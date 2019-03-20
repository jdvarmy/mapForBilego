import React, { Component } from 'react'
import { fetchCurrenciesList } from './../data/fetch'
import Loading from './Loading'
import Wrapper from './Wrapper'
import './chooser.css'
import Layout from './Layout'

class Chooser extends Component {
    state = {
        data: null
    };

    componentWillMount() {
        fetchCurrenciesList().then((data) => {
            this.setState({data: data});
        });
    }

    render() {
        return (
            <div id="bilego-sell-tickets">
                { this.state.data && (this.state.data.type === 'map' || this.state.data.type === 'set') ? <Wrapper data={this.state.data} /> : <Loading /> }
                <Layout />
            </div>
        );
    }
}

export default Chooser;