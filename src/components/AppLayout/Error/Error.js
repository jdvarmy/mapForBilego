import React from 'react'
import {inject, observer} from 'mobx-react';
// import styled from 'styled-components';

@inject('serverDataStore', 'cartStore', 'basketStore')
@observer
class Error extends React.Component{
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    returnToTheTickets = () => {
        this.clear();
    };

    clear = () => {
        const { serverDataStore:{ clean }, cartStore:{ clear }, basketStore:{ clearBasket, blockingForm } } = this.props;

        clear();
        clean();
        clearBasket();
        blockingForm(false);
    };

    render(){
        const { serverDataStore:{ error } } = this.props;

        this.timeout = setTimeout( () => {
            this.clear();
        }, 9000);

        return (
            <>
                <div>{error}</div>
                <div onClick={this.returnToTheTickets}>return to the tickets</div>
            </>
        )
    }
}

export default Error;