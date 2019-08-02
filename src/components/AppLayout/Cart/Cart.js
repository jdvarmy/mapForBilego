import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Email from './elements/Email'
import Additional from './elements/Additional'
import Tickets from './elements/Tickets'
import Footer from './elements/Footer'
import { $css } from '../../styles/defaults';
import { getStrEnding } from '../functions/functions';
import { Drawer, Icon, Spin } from 'antd';
import Checkout from '../Checkout/Checkout';

const Wrapper = styled(Drawer)`
    color: ${$css.colors.black};
    .ant-drawer-body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
`;
const Container = styled('div')`
    height: ${$css.sizes.containerH};
    position: relative;
    width: 100%;
    & .ant-spin-nested-loading, & .ant-spin, & .ant-spin-container{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
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
const AdditionalWrap = styled(Div)`
    ${props => props.isSmallScreen && `
        padding: 10px 15px;
    `}
`;
const CountTickets = styled(Div)`
    font-size: 18px;
    color: ${$css.colors.darkGrey}
    line-height: 21px;
    ${props => props.isSmallScreen && `
        padding: 0 15px;
    `}
`;
const TicketsWrap = styled('div')`
    height: 249px;
    position: relative;
`;
const FooterWrap = styled('div')`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;

@inject('dataStore', 'cartStore', 'serverDataStore')
@observer
class Cart extends React.Component{
    render(){
        const {cartStore: {showCart, showPay, tickets}, dataStore: {isSmallScreen}, serverDataStore: {checkoutData}} = this.props,
          length = tickets ? tickets.length : 0;

        return(
            <Wrapper
                placement='left'
                visible={showCart}
                zIndex={100}
                closable={false}
                width={isSmallScreen ? 375 : 476}
            >
                <Container>
                    <Header>
                        <span>Подтверждение заказа</span>
                    </Header>
                    <Div>
                        <Email />
                    </Div>
                    <AdditionalWrap isSmallScreen={isSmallScreen} >
                        <Additional/>
                    </AdditionalWrap>
                    <CountTickets isSmallScreen={isSmallScreen} >
                        <span>{`${length} ${getStrEnding(length, ['билет','билета','билетов'])}`}</span>
                    </CountTickets>
                    <TicketsWrap>
                        <Tickets/>
                    </TicketsWrap>
                    <FooterWrap>
                        <Footer />
                    </FooterWrap>
                </Container>
                <Wrapper
                    placement='left'
                    visible={showPay}
                    zIndex={100}
                    closable={false}
                    width={isSmallScreen ? 375 : 476}
                >
                    <Container>
                        <Spin
                          tip="Создание заказа..."
                          delay={$css.animation.delay}
                          indicator={<Icon type="loading" style={{ fontSize: 24, color: $css.colors.orange }} spin />}
                          spinning={!checkoutData}
                        >
                            {checkoutData && <Checkout />}
                        </Spin>
                    </Container>
                </Wrapper>
            </Wrapper>
        );
    }
}

export default Cart;