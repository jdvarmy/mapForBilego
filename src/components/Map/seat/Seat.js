import React from 'react'
import { observer } from "mobx-react/index";
import ReactDOM from "react-dom";
import mapStore from "../../Store/MapStore";

import basketStore from "../../Store/BasketStore"

import { SeatStore } from "../../Store/SeatStore"
import { TooltipSeat } from "../../Tooltip/TooltipSeat"

@observer
class Seat extends React.Component {
    constructor(props){
        super(props);
        const { id, tickets } = props;

        this.seatStore = new SeatStore();
        this.seatStore.init( { id, tickets } );
        if( this.seatStore.ticket && this.seatStore.ticket.type === 'with_map_sector' )
            this.seatStore.addSpecialType();
        this.scale = 1;
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
            this.scale = mapStore.scale;
            this.seatStore.onEnter();

            const errorY = this.seatStore.click ? 0 : - 2 * this.scale;
            this.tooltip.create( errorY );

        }
    };
    handlerUnhover = e => {
        this.seatStore.onOver();
        if(this.seatStore.ticket) this.tooltip.delete();
    };

    handlerClick = e => {
        const { onClick, ticket } = this.seatStore;
        onClick();
        basketStore.toBasket( ticket, this.seatStore.click );
    };

    handlerSpecialClick = e => {
        const { setSetWindowMode } = this.seatStore;
        setSetWindowMode(true);
    };

    render(){
        const {el: {cx, cy, r, name, comp}, id} = this.props;
        let text, radius, style;
        const { hover, ticket, click, specialType } = this.seatStore;
        const scale = this.scale;

        if( ticket ) {
            text = <text className="circle-text" fontSize={(r*1.8 + scale*2.2).toFixed(2)} x={cx} y={(cy*1 + 2.4*scale).toFixed(2)}>
                {ticket.seat_name}
            </text>;

            if ( (click && hover) || click ) {
                radius = (r*1.3).toFixed(2);
                style = {fill: 'white', stroke: ticket.color, strokeWidth: `${r}px`}
            }else if( hover ){
                radius = (r*1.8).toFixed(2);
                style = {fill: ticket.color};
            }else{
                radius = r;
                style = {fill: ticket.color};
            }
        }else{
            radius = (r*0.8).toFixed(2);
            style = {fill: '#e5e5e5'};
        }

        return (
            <g onMouseEnter={this.handlerHover}
                onMouseLeave={this.handlerUnhover}
                data-name={name}
                data-component={comp}
                onClick={ !specialType ? this.handlerClick : this.handlerSpecialClick}
                // todo: add to basket from mobile device
            >
                <circle id={id}
                    cx={cx}
                    cy={cy}
                    r={radius}
                    style={style}
                    className={click || hover ? 'circle' : ''}
                />
                {(!click && hover) && text}
            </g>
        )
    }
}

export default Seat;

