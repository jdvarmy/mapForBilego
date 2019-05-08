import React from 'react'
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import { Product } from './Product';

const Div = styled('div')`
    padding: 0;
    margin: 0;
`;

const ButtonWrap = styled(Div)`
    margin: 0;
    width: 100%;
    height: 100%;
`;

const Button = styled('button')`
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    outline: none;
    padding: 8px 20px;
    background: #ffae19;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin-bottom: 0;
    margin-top: 1px;
    transition: background .2s ease;
    &:hover{
        background: #0c5a40;
    }
`;

const Summary = styled(Div)`
    text-align: right;
    white-space: nowrap;
    word-spacing: -2px;
`;

const Content = styled(Div)`
    width: 100%;
    position: relative;
`;

@inject('basketStore', 'serverDataStore')
@observer
class Products extends React.Component{

    sendForm = e => {
        e.preventDefault();
        const { basketStore:{ ticketsMap, blockingForm }, serverDataStore:{ getCheckoutData } } = this.props;
        let request = {
            action: 'get_cart_tickets',
            form: {}
        };

        blockingForm(true);

        ticketsMap.forEach(el=>{
            request.form[el.id] = {
                quantity: el.count,
                variation_id: ''
            }
        });

        getCheckoutData(request);
    };

    countSummary = () => {
        let summary = 0;
        const { basketStore:{ tickets } } = this.props;
        tickets.forEach( el => {
            summary += el.price*1;
        } );
        return summary;
    };

    render(){
        const { basketStore:{ tickets } } = this.props;

        return(
            <>
                <ButtonWrap>
                    <Button onClick={this.sendForm}>Купить билеты</Button>
                </ButtonWrap>
                <Summary>{this.countSummary()} ₽</Summary>
                <Content>
                    { tickets.map( ( el, k ) => <Product key={el.id.toString() + k} ticket={el} /> ) }
                </Content>
            </>
        );
    }
}
export default Products