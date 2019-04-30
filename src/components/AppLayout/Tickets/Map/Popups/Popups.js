import React from 'react';
import { observer } from "mobx-react/index";
import BasketStore from '../../Store/BasketStore'
import { moneyFormating } from '../../functions/functions'

@observer
class Popups extends React.Component{
    constructor(props){
        super(props);

        this.count = 0;
    }

    close = () => {
        const { setSetWindowMode } = BasketStore;
        setSetWindowMode(false, []);
    };

    countPlus = () => {
        const { currentTicketsSet, toBasket } = BasketStore;
        toBasket( currentTicketsSet, true );
    };
    countMinus = () => {
        const { currentTicketsSet, toBasket } = BasketStore;
        toBasket( currentTicketsSet, false );
    };

    render(){
        let buffy = null;
        const { setWindowMode, currentTicketsSet } = BasketStore;

        if( setWindowMode && currentTicketsSet ) {
            const { name, price } = currentTicketsSet;

            buffy = (
                <div className="bt-sc active-form">
                    <div className="bt-sc-h">
                        <div className="bt-sc-h-h">{name}</div>
                        <div className="bt-sc-h-e" onClick={this.close}>+</div>
                    </div>
                    <div className="bt-sc-content">
                        <div className="bt-money-control">
                            <div className="money"><span>{moneyFormating(price, true)}</span></div>
                        </div>
                        <div className="bt-q-control sector-item-qb-c">
                            <div className="minus" onClick={this.countMinus}>-</div>
                            <div className="bt-number"><span></span></div>
                            <div className="plus" onClick={this.countPlus}>+</div>
                        </div>
                    </div>
                </div>
            );
        }

        return <>{buffy}</>;
    }
}

export default Popups;