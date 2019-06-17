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
    overflow: auto;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: rgba(0,0,0,0.1);
        border: 1px solid #ccc;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: linear-gradient(left, #fff, #e4e4e4);
        border: 1px solid #aaa;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb:active {
        background: linear-gradient(left, #22ADD4, #1E98BA);
    }
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