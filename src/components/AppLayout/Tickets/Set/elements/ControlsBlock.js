import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Wrapper = styled('div')``;

const Container = styled('div')`
    display: inline-block;
    user-select: none;
`;

const Element = styled(Container)`
    position: relative;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #f7f7f7;
    color: #0c5a40;
    cursor: pointer;
    font-size: 24px;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    &::after{
        position: relative;
        bottom: 2px;
        transition: all .5s;
    }
    &:active{
        background-color: #f4f4f4;
    }
    &:hover{
        background-color: #ffb637;
    }
`;

const Amount = styled(Container)`
    vertical-align: baseline;
    padding: 0 14px;
    font-size: 20px;
    color: #222;
`;

const Plus = styled(Element)`
    ${props => props.disabled && `
        background-color: #fff;
        cursor: default;
        &:hover{
            background-color: #fff;
        }
    `};
    &::after{
        content: '+';
    }
`;
const Minus = styled(Element)`
    ${props => props.disabled && `
        background-color: #fff;
        cursor: default;
        &:hover{
            background-color: #fff;
        }
    `};
    &::after{
        content: '-';
    }
`;

@inject('setStore', 'basketStore')
@observer
class ControlBlock extends React.Component{
    handlerClickMinus = () => {
        const { basketStore:{ toBasket }, setStore:{ ticket } } = this.props;
        toBasket( ticket, false );
    };
    handlerClickPlus = () => {
        const { basketStore:{ toBasket }, setStore:{ ticket } } = this.props;
        toBasket( ticket, true );
    };

    render(){
        const { setStore:{ ticket:{ id, stock } }, basketStore:{ tickets, isFull } } = this.props;

        let count = 0;
        for( let i=tickets.length; i--; ){
            if( id === tickets[i].id ){
                count++;
            }
        }

        return(
            <Wrapper>
                <Minus onClick={this.handlerClickMinus} disabled={count <= 0}/>
                <Amount>{count}</Amount>
                <Plus onClick={this.handlerClickPlus} disabled={count >= stock || isFull}/>
            </Wrapper>
        );
    }
}

export default ControlBlock;