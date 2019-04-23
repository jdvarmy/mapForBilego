import React from 'react';
import { observer } from "mobx-react";
import BasketStore from '../Store/BasketStore'
import { moneyFormating } from '../functions/functions'

@observer
class SelectingSetTickets extends React.Component{

    constructor(props){
        super(props);

        this.count = 0;
    }

    close = () => {
        const { setSetWindowMode } = BasketStore;
        setSetWindowMode(false, []);
    };

    countPlus = () => {
        const { currentTicketsSet, tickets } = BasketStore;
        const count = this.findCount( currentTicketsSet, tickets )
        console.log(count)
        // todo: остановились здесь. нужно взять каунт прибавить один и засунуть обратно в баскет при этом. подумать, нужно ли заморачиваться с кол-вом в билете. может просто сделать массив?
    };

    findCount = (ticket, set) => {
        let c = 0;
        set.forEach( el => {
            if( el.id === ticket.ID )
                c = el.count;
        } );

        return c;
    };

    render(){
        let buffy = null;
        const { setWindowMode, currentTicketsSet } = BasketStore;

        if( setWindowMode && currentTicketsSet ) {
            const { name, price, count } = currentTicketsSet;

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
                            <div className="minus">-</div>
                            <div className="bt-number"><span></span></div>
                            <div className="plus">+</div>
                        </div>
                    </div>
                </div>
            );
        }

        return <>{buffy}</>;
    }
}

export default SelectingSetTickets;