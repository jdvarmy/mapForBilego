import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Map from './Map/Map';
import Set from './Set/Set';
import Basket from '../Basket/Basket';
import Layout from './Layout/Layout';
import Cart from '../Cart/Cart';

const FadeInWrap = styled('div')`
    animation-duration: .5s;
    animation-timing-function: cubic-bezier(0,0,0.88,1);
    animation-fill-mode: both;
    animation-name: fade-in;
`;

@inject('serverDataStore')
@observer
class Tickets extends React.Component{
    render(){
        const { serverDataStore: { data } } = this.props;

        return(
            <FadeInWrap>
                <div data-type={data.ticket_type}>
                    <div>
                        {data.ticket_type === 'map' ? <Map/> : <Set/>}
                        <Basket />
                    </div>
                </div>
                <Layout />
                <Cart />
            </FadeInWrap>
        );
    }
}

export default Tickets;