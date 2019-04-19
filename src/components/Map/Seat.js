import React from 'react'
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import mapStore from "../Store/MapStore";

import basketStore from "../Store/BasketStore"

import { SeatStore } from "../Store/SeatStore"
import { TooltipSeat } from "../Tooltip/TooltipSeat"

@observer
class Seat extends React.Component {
    constructor(props){
        super(props);
        const { id, tickets } = props;

        this.seatStore = new SeatStore();
        this.seatStore.init( { id, tickets } );
    }

    componentDidMount(): void {
        this.el = ReactDOM.findDOMNode(this);

        if( this.el && this.seatStore.ticket ) {
            const { price_regular, sector_name, row_name, seat_name } = this.seatStore.ticket,
                el = this.el;

            this.tooltip = new TooltipSeat({price_regular, sector_name, row_name, seat_name, el});
        }
    }

    handlerHover = e => {
        if(this.seatStore.ticket) {
            this.seatStore.onEnter();
            this.tooltip.create( - 2 * mapStore.scale );
        }
    };
    handlerUnhover = e => {
        this.seatStore.onOver();
        if(this.seatStore.ticket) this.tooltip.delete();
    };

    render(){
        let {el: {cx, cy, r, name, comp}, id} = this.props;
        let text;
        const { hover, ticket } = this.seatStore;
        const { scale } = mapStore;

        if(ticket) r = hover ? r*1.8 : r;
        else r = r*0.8;

        if(ticket)
            text = <text className="circle-text" fontSize={(r*1 + scale*2.2).toFixed(2)} x={cx} y={(cy*1 + 2.4*scale).toFixed(2)}>
                {ticket.seat_name}
            </text>;

        return (
            <g onMouseEnter={this.handlerHover}
                onMouseLeave={this.handlerUnhover}
                data-name={name}
                data-component={comp}
                onClick={basketStore.addToBasket}
                // todo: add to basket from mobile device
            >
                <circle id={id}
                    cx={cx}
                    cy={cy}
                    r={(r*1).toFixed(2)}
                    style={ticket ? {fill: ticket.color} : {fill: '#e5e5e5'}}
                    className={hover ? 'circle' : ''}
                />
                {hover && text}
            </g>
        )
    }
}

export default Seat;

