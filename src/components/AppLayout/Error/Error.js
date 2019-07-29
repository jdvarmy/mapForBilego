import React, { Fragment } from 'react'
import {inject, observer} from 'mobx-react';

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
        const { serverDataStore:{ clean }, cartStore:{ clear }, basketStore:{ clearBasket } } = this.props;

        clear();
        clean();
        clearBasket();
    };

    render(){
        const { serverDataStore:{ error } } = this.props;

        if(error) {
            this.timeout = setTimeout(() => {
                this.clear();
            }, 9000);
        }

        return (
            <Fragment>
                {error &&
                <div id="errorrr">
                    {error}
                    <div onClick={this.returnToTheTickets}>return to the tickets</div>
                </div>
                }
            </Fragment>
        )
    }
}

export default Error;