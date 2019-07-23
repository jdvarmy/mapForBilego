import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Form from './Form';

const Wrapper = styled('div')``;
const Meta = styled('div')``;

@inject('basketStore')
@observer
class Basket extends React.Component{
    render(){
        const { basketStore:{ productInBasket } } = this.props;

        return (
            <>
                <Wrapper>
                    { productInBasket && <Form /> }
                </Wrapper>
                <Meta />
            </>
        );
    }
}

export default Basket;