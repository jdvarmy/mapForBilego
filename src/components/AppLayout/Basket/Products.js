import React from 'react'
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { moneyFormating } from '../functions/functions';

import Product from './Product';

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
    background-color: #fff;
    text-align: right;
    white-space: nowrap;
    word-spacing: -2px;
`;

const Content = styled(Div)`
    width: 100%;
    position: relative;
`;
const ContentWidth = styled('div')`
    max-width: ${props=>props.maxWidth}px;
    margin-top: -40px;
    margin-left: auto;
`;
const Table = styled(Div)`
    max-width: ${props=>props.maxWidth}px;
    width: 100%;
    box-sizing: border-box;
`;
const TableRow = styled('div')`
    display: flex;
    flex-direction: row-reverse;
`;

@inject('basketStore', 'serverDataStore', 'cartStore')
@observer
class Products extends React.Component{

    getCart = e => {
        e.preventDefault();
        const { basketStore:{ tickets, blockingForm }, cartStore:{ addTickets } } = this.props;

        blockingForm(true);
        addTickets(tickets);
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
        const { basketStore:{ tickets, count } } = this.props;
        const maxWidth = 140 * count;

        return(
            <>
                <ButtonWrap>
                    <Button onClick={this.getCart}>Купить билеты</Button>
                </ButtonWrap>
                <Summary>{moneyFormating(this.countSummary(), true)}</Summary>
                <Content>
                    <ContentWidth maxWidth={maxWidth}>
                        <Table maxWidth={maxWidth}>
                            <TableRow>
                                { tickets.map( ( el, k ) => <Product key={el.id.toString() + k} ticket={el} /> ) }
                            </TableRow>
                        </Table>
                    </ContentWidth>
                </Content>
            </>
        );
    }
}
export default Products