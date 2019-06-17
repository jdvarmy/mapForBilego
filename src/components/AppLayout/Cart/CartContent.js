import React from 'react';
import { observer, inject } from 'mobx-react';

@observer
class Cart extends React.Component{
    render(){
        const { tickets } = this.props;

        console.log(tickets)
        return(
            <div/>
        );
    }
}

export default Cart;