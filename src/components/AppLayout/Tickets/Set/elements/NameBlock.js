import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')``;

const Container = styled('span')`
    display: block;
    font-size: 18px;
    color: #111;
    font-weight: 400;
`;

export default class NameBlock extends React.Component{
    render(){
        const { name } = this.props;
        return(
            <Wrapper>
                <Container>{name}</Container>
            </Wrapper>
        );
    }
}