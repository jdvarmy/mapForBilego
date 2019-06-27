import React from 'react';
import { observer, inject } from 'mobx-react';

import CartContent from './CartContent'

@inject('cartStore')
@observer
class Cart extends React.Component{
    render(){
        const { cartStore:{ tickets, event } } = this.props;

        return(
            <>
                { tickets && <CartContent tickets={tickets} event={event} /> }
            </>
        );
    }
}

export default Cart;