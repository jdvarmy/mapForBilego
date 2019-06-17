import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('serverDataStore')
@observer
class Checkout extends React.Component{
    render(){
        const { serverDataStore:{ checkoutData } } = this.props;
        console.log({...checkoutData})
        return(
            <div/>
        );
    }
}

export default Checkout;