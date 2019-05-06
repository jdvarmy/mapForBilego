import React from 'react'
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import { Product } from './Product';

const Wrapper = styled('span')`
    display: table-row;
    padding: 0;
    margin: 0;
`;

const Div = styled('div')`
    display: table-cell;
    padding: 0;
    margin: 0;
    vertical-align: middle;
`;

const ButtonWrap = styled(Div)`
    width: 112px;
    padding-right: 20px;
    height: 73px;
    margin: 0;
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
    height: 73px;
    text-align: right;
    white-space: nowrap;
    word-spacing: -2px;
`;

const Content = styled(Div)`
    width: 100%;
    vertical-align: top;
    position: relative;
`;

@inject('basketStore')
@observer
class Products extends React.Component{

    countSummary = () => {
        let summary = 0;
        const { basketStore:{ tickets } } = this.props;
        tickets.forEach( el => {
            summary += el.price*1*el.count;
        } );
        return summary;
    };

    render(){
        const { basketStore:{ tickets } } = this.props;

        return(
            <Wrapper>
                <ButtonWrap>
                    <Button>Купить билеты</Button>
                </ButtonWrap>
                <Summary>{this.countSummary()} ₽</Summary>
                <Content>
                    { tickets.map( ( el, k ) => <Product key={el.id.toString() + k} ticket={el} /> ) }
                </Content>
            </Wrapper>
        );
    }
}
export default Products