import React from 'react'
import { inject, observer } from 'mobx-react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { getStrEnding } from '../../../functions/functions';
import Informer from '../../../Informer/Informer';
import { SeatStore } from '../stores/SeatStore'
import { TooltipSeat } from '../Tooltip/TooltipSeat'

const Wrapper = styled('g')``;

const Circle = styled('circle')`
    transition: all 0.1s cubic-bezier(0.39, 0.575, 0.565, 1);
    ${props => props.showText && `
        cursor: pointer;
        filter: drop-shadow( 0px 0px 10px rgba(0,0,0,.1) );`
    }
`;

const Text = styled('text')`
    text-anchor: middle;
    dominant-baseline: middle;
    font-weight: 700;
    fill: #fff;
    cursor: pointer;
`;

@inject('serverDataStore', 'mapStore', 'basketStore', 'dataStore')
@observer
class Seat extends React.Component {
    constructor(props){
        super(props);
        const { id, serverDataStore:{ data: { tickets, ticketcloud } }, el:{name}, row, sector } = props;

        this.seatStore = new SeatStore();
        if( ticketcloud )
            this.seatStore.initTicketCloud( { name, row, sector, tickets } );
        else
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

    handlerHover = () => {
        if(this.seatStore.ticket) {
            const { dataStore:{ isSmallScreen } } = this.props;

            this.scale = this.props.mapStore.scale;
            !isSmallScreen && this.seatStore.onEnter();

            const errorY = this.seatStore.click ? 0 : - 2 * this.scale;
            !isSmallScreen && this.tooltip.create( errorY );
        }
    };

    handlerUnhover = e => {
        this.seatStore.onOver();
        if(this.seatStore.ticket) this.tooltip.delete();
    };

    handlerClick = e => {
        const { onClick, ticket, click } = this.seatStore;
        const { basketStore:{ isFull, toBasket, maxCountInBasket } } = this.props;

        if( !click && isFull )
            Informer({
                title: 'Опаньки!',
                text: `За один заказ можно купить только ${maxCountInBasket} ${getStrEnding(maxCountInBasket, ['билет','билета','билетов'])}`
            });
        if( (!click && !isFull) || ((click && !isFull)) || (click && isFull) ) {
            onClick();
            toBasket(ticket, this.seatStore.click, this.seatStore);
        }
    };

    handlerSpecialClick = e => {
        const { basketStore:{ getModalTickets } } = this.props;
        const { ticket } = this.seatStore;

        getModalTickets(ticket);
    };

    findTicketInBascket = () => {
        let t = false;
        this.props.basketStore.ticketsMap.forEach(e => {
            if(e.id === this.seatStore.ticket.id)
                t = e
        });
        return t;
    };

    render(){
        const {el: {cx, cy, r, name, comp}, id} = this.props;
        const { hover, ticket, click, specialType } = this.seatStore;
        const scale = this.scale;
        let text, radius, style;

        if( ticket ) {
            text = <Text fontSize={(r*1.8 + scale*2.2).toFixed(2)} x={cx} y={(+cy + 2.4*scale).toFixed(2)}>
                {ticket.seat_name}
            </Text>;

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

        if(specialType){
            const ticketInBasket = this.findTicketInBascket();

            if(ticketInBasket) {
                text = (<Text fontSize={(r * 1.8 + scale * 2.2).toFixed(2)} x={cx} y={(cy * 1 + 2.4 * scale).toFixed(2)}>
                    {ticketInBasket.count}
                </Text>);
                radius = (r * 1.9).toFixed(2);
            }
        }

        return (
            <Wrapper
                data-name={name}
                data-component={comp}
                onMouseEnter={this.handlerHover}
                onMouseLeave={this.handlerUnhover}
                onClick={ !specialType ? this.handlerClick : this.handlerSpecialClick}
            >
                <Circle
                    id={id}
                    cx={cx}
                    cy={cy}
                    r={radius}
                    style={style}
                    showText={click || hover}
                />
                {(!click && hover && !specialType) && text}
                {specialType && text}
            </Wrapper>
        )
    }
}

export default Seat;

