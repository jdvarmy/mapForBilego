import React from 'react'
import { observer, inject } from "mobx-react";
import styled from 'styled-components';

import Products from './Products'

const FormWrap = styled('form')`
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    ${props=>props.productInBasket && `
        animation-duration: .1s;
        animation-fill-mode: both;
        animation-name: in;
    `};
`;

const Container = styled('div')`
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 172px 118px auto;
    grid-template-rows: 75px;
    justify-items: center;
    align-items: center;
`;

@inject('basketStore')
@observer
class Form extends React.Component{
    render(){
        const { basketStore:{ productInBasket } } = this.props;

        return(
            <FormWrap
                  action="/cart"
                  method="post"
                  encType='multipart/form-data'
                  productInBasket={productInBasket}
            >
                <Container>
                    <Products />
                </Container>
            </FormWrap>
        );
    }
}

export default Form;