import React from 'react';
import styled from 'styled-components';
import { moneyFormating } from '../../../functions/functions';

const Wrapper = styled('div')`
    font-size: smaller;
`;

export default class PriceBlock extends React.Component{
    render(){
        const { price } = this.props;

        return(
            <Wrapper>
                <span>{ moneyFormating(price, true) }</span>
            </Wrapper>
        );
    }
}