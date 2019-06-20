import React from 'react';
import { observer, inject } from 'mobx-react';

import CartContent from './CartContent'

@inject('cartStore')
@observer
class Cart extends React.Component{

    sendForm = e => {
        e.preventDefault();
        const { basketStore:{ ticketsMap, blockingForm }, serverDataStore:{ getCheckoutData } } = this.props;
        let request = {
            // form: {}
        };

        blockingForm(true);

        ticketsMap.forEach(el=>{
            request[el.id] = {
                quantity: el.count,
                variation_id: ''
            }
        });

        getCheckoutData(request);
    };

    render(){
        // const { serverDataStore:{ checkoutData } } = this.props;
        const { cartStore:{ tickets, event } } = this.props;

        return(
            <>
                { tickets && <CartContent tickets={tickets} event={event} /> }
            </>
        );
    }
}

export default Cart;