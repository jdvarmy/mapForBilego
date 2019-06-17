import React from 'react';
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import Map from './Map/Map'
import Set from './Set/Set'
import Basket from '../Basket/Basket'
import Layout from './Layout/Layout'
import Popups from './Map/Popups/Popups'
import Block from './Map/Block'
import Checkout from '../Checkout/Checkout';
import Cart from '../Cart/Cart';
import Informer from '../Informer/Informer';

const FadeInWrap = styled('div')`
    animation-duration:.8s;
    animation-fill-mode:both;
    animation-name:fade-in;
`;

const Wrapper = styled('div')``;

const Container = styled('div')`
    position: relative;
`;

@inject('serverDataStore', 'informerStore')
@observer
class Tickets extends React.Component{
    render(){
        const { serverDataStore: { data }, informerStore:{ message } } = this.props;

        return(
            <FadeInWrap>
                <Wrapper data-type={data.ticket_type}>
                    <Container>
                        {data.ticket_type === 'map' ? <Map/> : <Set/>}
                        <Basket />
                    </Container>
                </Wrapper>
                <Block />
                <Popups />
                <Layout />
                <Checkout />
                <Cart />
                { message && ( <Informer /> )}
            </FadeInWrap>
        );
    }
}

export default Tickets;