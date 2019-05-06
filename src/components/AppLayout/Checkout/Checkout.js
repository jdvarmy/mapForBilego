import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('serverDataStore')
@observer
class Checkout extends React.Component{
    render(){
        return(
            <div/>
        );
    }
}

export default Checkout;