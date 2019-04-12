import React from 'react'
import { observer } from "mobx-react";
import { observable } from "mobx";
import Tooltip from '../Tooltip'
import ReactDOM from "react-dom";

@observer
class Seat extends React.Component {
    constructor(props){
        super(props);

        this.tickets = props.tickets;
        this.getCurrenTicket(props.id);

    }

    @observable hover = false;

    getCurrenTicket = (id) =>{
        this.tickets.map(e=>{
            if( id === e.UID)
                this.ticket = e
        });
    };

    handlerHover = () => {
        this.hover = true;
        const el = ReactDOM.findDOMNode(this);

        if(this.ticket) Tooltip.create(el, this.ticket);
    };
    handlerUnhover = () => {
        this.hover = false;

        if(this.ticket) Tooltip.delete();
    };

    render(){
        let {el: {cx, cy, r, name, comp}, id} = this.props;
        let style = {}, text;

        style = this.ticket ? {fill: this.ticket.color} : {fill: '#e5e5e5'};

        // todo: add shadow
        if(this.ticket)r = this.hover ? r*1.8 : r;
        else r = r*0.8;

        // todo: text note
        if(this.ticket) text = <text fontSize="72" x={cx} y={cy}>{this.ticket.seat_name}</text>;


        return <circle
                id={id}
                cx={cx}
                cy={cy}
                r={(r*1).toFixed(2)}
                data-name={name}
                data-component={comp}
                style={style}
                stroke="#ffffff"
                onMouseEnter={this.handlerHover}
                onMouseLeave={this.handlerUnhover}
                className={ this.hover ? 'shadow' : '' }
            >
            { this.hover && text }
            </circle>
    }
}

export default Seat;

