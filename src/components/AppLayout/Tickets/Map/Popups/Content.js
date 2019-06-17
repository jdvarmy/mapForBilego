import React from 'react';
import styled from 'styled-components';

import {moneyFormating} from "../../../functions/functions";
import {inject, observer} from "mobx-react";

const Wrapper = styled('div')``;

const Container = styled('div')`
    vertical-align: middle;
    display: inline-block;
    height: 42px;
    padding: 20px 0;
`;

const MoneyWrap = styled(Container)`
    font-size: 15px;
    line-height: 17px;
    text-align: left;
    padding: 20px 40px 20px 0;
`;

const Money = styled('div')`
    & span:first-child{
        vertical-align: text-bottom;
        font-size: 18px;
    }
    & span:last-child{
        color: #999;
        font-size: 13px;
        margin-top: 5px;
        display: inline-block;
    }
`;

const ControlWrap = styled(Container)`
    & div{
        display: inline-block;
        margin-bottom: 0;
        user-select: none;
    }
`;

const Number = styled('div')`
    margin: 0 15px;
    font-size: 18px;
    color:#111;
`;

const Control = styled('div')`
    position: relative;
    width: 42px;
    height: 42px;
    color: #0c5a40;
    cursor: pointer;
    font-size: 26px;
    text-align: center;
    text-decoration: none;
    line-height: 38px;
    background-color: #f7f7f7;
    &:hover{
        background-color: rgb(255, 182, 55);
    }
`;

const style = `background-color: #fff;cursor:default;&:hover{background-color: #fff}`;

const Minus = styled(Control)`
    ${props => props.block && style};
`;
const Plus = styled(Control)`
    ${props => props.block && style};
`;

@inject('basketStore')
@observer
class Content extends React.Component{
    render(){
        const { price, minus, plus, tickets, maxCountTicket, basketStore:{ isFull } } = this.props;
        const count = tickets.length ? tickets.length : 0;

        const blockMinus = count===0;
        const blockPlus = isFull || count >= maxCountTicket;

        return(
            <Wrapper>
                <MoneyWrap>
                    <Money>
                        <span>{moneyFormating(price, true)}</span>
                        <br/>
                        <span>Входной билет</span>
                    </Money>
                </MoneyWrap>
                <ControlWrap>
                    <Minus block={blockMinus} onClick={minus}>-</Minus>
                    <Number><span>{count}</span></Number>
                    <Plus block={blockPlus} onClick={plus}>+</Plus>
                </ControlWrap>
            </Wrapper>
        );
    }
}

export default Content;