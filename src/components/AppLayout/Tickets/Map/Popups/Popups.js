import React from 'react';
import { observer, inject } from 'mobx-react/index';
import styled from 'styled-components';
import { getStrEnding } from '../../../functions/functions';

import Header from './Header';
import Content from './Content';

const Wrapper = styled('div')`
    width: 290px;
    height: 140px;
    background-color: #fff;
    position: absolute;
    top: calc(50% - 70px);
    left: calc(50% - 145px);
    z-index: 1;
    overflow: hidden;
    animation-duration: .1s;
    animation-fill-mode: both;
    animation-name: in;
`;

@inject('basketStore', 'informerStore')
@observer
class Popups extends React.Component{
    constructor(props){
        super(props);

        this.count = 0;
    }

    getTicketsById(id) {
        let nodes = [];
        const { basketStore:{ tickets } } = this.props;
        tickets.map(ticket=>{
            if(ticket.id === id) nodes.push(ticket)
        });

        return nodes
    }

    close = () => {
        const { basketStore:{ setSetWindowMode } } = this.props;
        setSetWindowMode(false, null);
    };

    countPlus = () => {
        const { basketStore:{ currentTicketsSet, toBasket, isFull, maxCountInBasket }, informerStore:{ setMessage } }  = this.props;
        toBasket( currentTicketsSet, true );
        if( isFull ){
            setMessage(`За один заказ можно купить только ${maxCountInBasket} ${getStrEnding(maxCountInBasket, ['билет','билета','билетов'])}`);
        }
    };

    countMinus = () => {
        const { basketStore:{ currentTicketsSet, toBasket } } = this.props;
        toBasket( currentTicketsSet, false );
    };

    render(){
        let buffy = null;
        const { basketStore:{ blockTicketsForm, currentTicketsSet } } = this.props;

        if( blockTicketsForm && currentTicketsSet ) {
            const { name, price, stock } = currentTicketsSet;

            buffy = (
                <Wrapper>
                    <Header name={name} close={this.close}/>
                    <Content
                        price={price}
                        minus={this.countMinus}
                        plus={this.countPlus}
                        tickets={this.getTicketsById(currentTicketsSet.id)}
                        maxCountTicket={stock}/>
                </Wrapper>
            );
        }

        return <>{buffy}</>;
    }
}

export default Popups;