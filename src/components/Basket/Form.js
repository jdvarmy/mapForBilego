import React from 'react'
import Products from './Products'
import {observer} from "mobx-react";
import basketStore from '../Store/BasketStore'

@observer
class Form extends React.Component{
    render(){
        // classNames = {['event-content-container', data.type].join(' ')};
        const { productInBasket } = basketStore;

        return(
            <form id="map-ticket-form" className={productInBasket ? 'active-form' : ''} action="/cart" method="post"
                               encType='multipart/form-data'>
                <div className="basket-content">
                    <Products />
                </div>
            </form>
        );
    }
}

export default Form;