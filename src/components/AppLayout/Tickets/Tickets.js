import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import Map from './Map/Map'
import Set from './Set/Set'
// import Basket from './Basket'
// import Layout from './Layout'
// import SelectingSetTickets from './Map/Popup/SelectingSetTickets'
// import Block from './Map/Block'

const Wrapper = styled('div')`

`;

const Container = styled('div')`
    position: relative;
`;

@inject('serverDataStore')
@observer
class Tickets extends React.Component{
    render(){
        const { serverDataStore: { data } } = this.props;

        return(
            <CSSTransition in={true} appear={true} timeout={800} classNames="fade">
                <>
                    <Wrapper data-type={data.type}>
                        <Container>
                            {data.type === 'map' ? <Map data={data}/> : <Set data={data}/>}
                            {/*<Basket />*/}
                        </Container>
                    </Wrapper>
                    {/*<Block />*/}
                    {/*<SelectingSetTickets />*/}
                    {/*<Layout />*/}
                </>
            </CSSTransition>
        );
    }
}

export default Tickets;