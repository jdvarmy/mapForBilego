import React from 'react'
import { observer, inject } from "mobx-react";
import styled from 'styled-components';
import { $css, AnimationBottom } from '../../styles/defaults';
import Products from './Products';

const Wrapper = styled(AnimationBottom)`
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid ${$css.colors.rgbaBorder};
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
            <Wrapper fast loading={productInBasket}>
                <Container>
                    <Products />
                </Container>
            </Wrapper>
        );
    }
}

export default Form;