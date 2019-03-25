import React, { Component } from 'react'
import { getData } from './../data/fetch'
import Loading from './Loading'
import Wrapper from './Wrapper'
import './chooser.css'

// import {observable} from 'mobx'
// import {observer} from 'mobx-react'


class Chooser extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        getData().then((data) => {
            this.setState( {data: data} )
        });
    }

    render() {
        return (
            <div id="bilego-sell-tickets">
                {this.state.data ? <Wrapper data={this.state.data} /> : <Loading />}
            </div>
        );
    }
}

export default Chooser;