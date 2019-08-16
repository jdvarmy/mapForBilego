import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { moneyFormating } from '../functions/functions';
import { StyledButton, $css } from '../../styles/defaults';
import { getStrEnding } from '../functions/functions';
import Product from './Product';

const Summary = styled('div')`
    font-size: 20px;
    font-weight: 500;
    ${p=>!p.mobile && `background-color: ${$css.colors.white};font-size: 24px;`}
    white-space: nowrap;
    word-spacing: -2px;
`;
const TicketCount = styled(Summary)`
    text-align: center;
    line-height: 24px;
`;
const Content = styled('div')`
    ${p=>!p.mobile && `width: 100%;`}
    position: relative;
`;
const ContentWidth = styled('div')`
    max-width: ${p=>p.maxWidth}px;
    margin-top: -40px;
    margin-left: auto;
`;
const Table = styled('div')`
    max-width: ${p=>p.maxWidth}px;
    width: 100%;
    box-sizing: border-box;
`;
const TableRow = styled('div')`
    display: flex;
    flex-direction: row-reverse;
`;

@inject('basketStore', 'serverDataStore', 'cartStore', 'dataStore')
@observer
class Products extends React.Component{
    getCart = () => {
        const { basketStore:{ tickets }, cartStore:{ showHideCart }, serverDataStore:{ data:{ event } } } = this.props;
        showHideCart(tickets, event, moneyFormating(this.countSummary(), true));
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
        const { basketStore:{ tickets, count }, dataStore:{ isSmallScreen } } = this.props;
        const maxWidth = 140 * count;

        return(
            <Fragment>
                <StyledButton type="primary" onClick={this.getCart}>Купить билеты</StyledButton>
                <Summary mobile={isSmallScreen}>{moneyFormating(this.countSummary(), true)}</Summary>
                <Content mobile={isSmallScreen}>
                    { isSmallScreen
                      ? <TicketCount mobile={isSmallScreen}>{tickets.length} {getStrEnding(tickets.length, ['билет','билета','билетов'])}</TicketCount>
                      : <ContentWidth maxWidth={maxWidth}>
                            <Table maxWidth={maxWidth}>
                                <TableRow>
                                    { tickets.map( ( el, k ) => <Product key={el.id.toString() + k} ticket={el} number={k+1} /> ) }
                                </TableRow>
                            </Table>
                        </ContentWidth>
                      }
                </Content>
            </Fragment>
        );
    }
}
export default Products