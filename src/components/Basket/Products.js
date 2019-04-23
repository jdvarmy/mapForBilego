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
            summary += el.price*1;
        } );

        return summary;
    };

    render(){
        let ticketsArr = [];
        const { tickets, count } = basketStore;
        tickets.forEach( el => ticketsArr.push(el) );

        const summary = this.countSummary();

        return(
            <span>
                <div className="basket-content-footer-button">
                    <button width="112px" height="36px" fontSize="15"
                            className="session-scheme_continue sc-bwzfXH csUinh">Купить</button>
                </div>
                <div className="basket-content-footer-summary">{summary} ₽</div>
                <div className="basket-content-footer">
                    { ticketsArr.map( el => <Product key={el.id} ticket={el} /> ) }
                </div>
            </span>
        );
    }
}
export default Products