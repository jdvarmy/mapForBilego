import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import Email from './elements/Email'
import Additional from './elements/Additional'
import Tickets from './elements/Tickets'
import Footer from './elements/Footer'

import { getStrEnding } from '../functions/functions'

const SpanBlack = styled('span')`
    color: #111;
`;
const SpanGray = styled('span')`
    color: #676662;
`;

const Wrapper = styled('div')`
    position: absolute;
    text-align: left;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 50%;
    max-width: 440px;
    padding: 0 30px;
    ${props=>props.isSmallScreen && `
        width: 100%;
        max-width: none;
        padding: 0;
    `}
    min-width: 350px;
    background-color: #fff;
    animation-duration: 0.2s;
    animation-timing-function: cubic-bezier(0,0,0.88,1);
    animation-fill-mode: both;
    animation-name: in-left;
`;

const Div = styled('div')`
    padding: 10px 0 10px;
`;

const Header = styled('div')`
    font-size: 16px;
    margin-bottom: 14px;
    margin-top: 14px;
    text-align: center;
    font-weight: 700;
`;
const EmailWrap = styled(Div)``;
const AdditionalWrap = styled(Div)`
    ${props => props.isSmallScreen && `
        padding: 10px 15px;
    `}
`;
const CountTickets = styled(Div)`
    font-size: 18px;
    line-height: 21px;
    ${props => props.isSmallScreen && `
        padding: 0 15px;
    `}
`;
const TicketsWrap = styled(Div)`
    height: 249px;
    padding: 0;
    padding: 0;
    position: relative;
`;
const FooterWrap = styled('div')`
    margin: 0;
`;

@inject('dataStore')
@observer
class Cart extends React.Component{
    render(){
        const { tickets, event, dataStore:{ isSmallScreen } } = this.props,
            length = tickets.length;

        return(
            <Wrapper isSmallScreen={isSmallScreen} >
                <Header>
                    <SpanBlack>Подтверждение заказа</SpanBlack>
                </Header>
                <EmailWrap>
                    <Email />
                </EmailWrap>
                <AdditionalWrap isSmallScreen={isSmallScreen} >
                    <Additional event={event}/>
                </AdditionalWrap>
                <CountTickets isSmallScreen={isSmallScreen} >
                    <SpanGray>{`${length} ${getStrEnding(length, ['билет','билета','билетов'])}`}</SpanGray>
                </CountTickets>
                <TicketsWrap>
                    <Tickets tickets={tickets}/>
                </TicketsWrap>
                <FooterWrap>
                    <Footer />
                </FooterWrap>
            </Wrapper>
        );
    }
}

export default Cart;