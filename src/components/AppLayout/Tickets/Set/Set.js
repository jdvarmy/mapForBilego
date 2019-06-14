import React from 'react';
import styled from 'styled-components';
import {inject} from 'mobx-react';
import SetElement from './SetElement';

const Wrapper = styled('div')`
    background-color: #fff;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0;
    height: 645px;
`;
const Container = styled('ul')`
    list-style: none;
    width: 100%;
    max-height: 545px;
    overflow: overlay;
`;


@inject('serverDataStore')
class Set extends React.Component{
    render() {
        const { serverDataStore:{ data:{ tickets } } } = this.props;

        return (
            <Wrapper>
                <Container>
                    {tickets.map( el=>(<SetElement element={el} key={el.id} />) )}
                </Container>
            </Wrapper>
        );
    }
}

export default Set;