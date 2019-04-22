import React from 'react';
import basketStore from '../Store/BasketStore'
import { observer } from "mobx-react"
import Form from './Form'

@observer
class Basket extends React.Component{
    render(){
        const { count } = basketStore;

        return (
            <>
                <div className="basket map-meta">
                    { count > 0 && <Form /> }
                </div>
                <div className="basket-meta"></div>
            </>
        );
    }
}

export default Basket;