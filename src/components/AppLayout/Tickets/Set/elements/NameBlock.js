import React from 'react';
import styled from 'styled-components';
import {inject} from "mobx-react";

const Wrapper = styled('div')`
    ${p => !p.mobile ? `text-align: left;` : `text-align: right;`};
`;

const Container = styled('span')`
    display: block;
    font-size: 18px;
    color: #111;
    font-weight: 400;
    ${p=>p.mobile && `font-size:15px;`};
`;

@inject('dataStore')
class NameBlock extends React.Component{
    render(){
        const { name, dataStore:{ isSmallScreen } } = this.props;
        return(
            <Wrapper mobile={isSmallScreen}>
                <Container mobile={isSmallScreen}>{name}</Container>
            </Wrapper>
        );
    }
}

export default NameBlock;