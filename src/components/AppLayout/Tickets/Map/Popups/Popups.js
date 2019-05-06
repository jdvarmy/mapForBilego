import React from 'react';
import { observer, inject } from 'mobx-react/index';
import styled from 'styled-components'

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

@inject('basketStore')
@observer
class Popups extends React.Component{
    constructor(props){
        super(props);

        this.count = 0;
    }

    close = () => {
        const { basketStore:{ setSetWindowMode } } = this.props;
        setSetWindowMode(false, []);
    };

    countPlus = () => {
        const { basketStore:{ currentTicketsSet, toBasket } } = this.props;
        toBasket( currentTicketsSet, true );
    };

    countMinus = () => {
        const { basketStore:{ currentTicketsSet, toBasket } } = this.props;
        toBasket( currentTicketsSet, false );
    };

    render(){
        let buffy = null;
        const { basketStore:{ setWindowMode, currentTicketsSet } } = this.props;

        if( setWindowMode && currentTicketsSet ) {
            const { name, price } = currentTicketsSet;

            buffy = (
                <Wrapper>
                    <Header name={name} close={this.close}/>
                    <Content price={price} minus={this.countMinus} plus={this.countPlus}/>
                </Wrapper>
            );
        }

        return <>{buffy}</>;
    }
}

export default Popups;