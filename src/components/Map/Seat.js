import React from 'react'
import { observer } from "mobx-react";
import { observable } from "mobx";
import { tooltip } from '../Tooltip'
import ReactDOM from "react-dom";
import mapStore from "../Store/MapStore";
import basketStore from "../Store/BasketStore"

@observer
class Seat extends React.Component {
    constructor(props){
        super(props);

        this.tickets = props.tickets;
        this.getCurrentTicket(props.id);
    }

    componentDidMount(): void {
        this.el = ReactDOM.findDOMNode(this);
    }

    @observable hover = false;

    getCurrentTicket = (id) =>{
        this.tickets.map(e=>{
            if( id === e.UID)
                this.ticket = e
        });
    };

    handlerHover = () => {
        if(this.ticket) {
            this.hover = true;
            tooltip.create(this.el, this.ticket);
        }
    };
    handlerUnhover = e => {
        this.hover = false;
        if(this.ticket) tooltip.delete();
    };

    render(){
        let {el: {cx, cy, r, name, comp}, id} = this.props;
        let style = {}, text;

        style = this.ticket ? {fill: this.ticket.color} : {fill: '#e5e5e5'};

        // todo: add shadow
        if(this.ticket)r = this.hover ? r*1.8 : r;
        else r = r*0.8;

        if(this.ticket) text =
            <text className="circle-text" fontSize={(r*1 + mapStore.scale*2.2).toFixed(2)} x={cx} y={(cy*1 + 2.4*mapStore.scale).toFixed(2)}>
                {this.ticket.seat_name}
            </text>;


        return (
            <g
                onMouseEnter={this.handlerHover}
                onMouseLeave={this.handlerUnhover}
                data-name={name}
                data-component={comp}
                onClick={basketStore.addToBasket}
                // todo add to basket from mobile device
            >
                <circle
                    id={id}
                    cx={cx}
                    cy={cy}
                    r={(r*1).toFixed(2)}
                    style={style}
                    className={this.hover ? 'circle' : ''}
                />
                {this.hover && text}
            </g>
        )
    }
}

export default Seat;

