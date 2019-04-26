import React from 'react'
import basketStore from '../Store/BasketStore'
import { observer } from "mobx-react";
import { Product } from './Product'

@observer
class Products extends React.Component{

    countSummary = () => {
        let summary = 0;
        const { tickets } = basketStore;
        tickets.forEach( el => {
            summary += el.price*1*el.count;
        } );
        return summary;
    };

    render(){
        let ticketsArr = [];
        const { tickets } = basketStore;
        tickets.forEach( el => ticketsArr.push(el) );

        return(
            <span>
                <div className="basket-content-footer-button">
                    <button width="112px" height="36px" fontSize="15"
                            className="session-scheme_continue sc-bwzfXH csUinh">Купить</button>
                </div>
                <div className="basket-content-footer-summary">{this.countSummary()} ₽</div>
                <div className="basket-content-footer">
                    { ticketsArr.map( el => <Product key={el.id} ticket={el} /> ) }
                </div>
            </span>
        );
    }
}
export default Products