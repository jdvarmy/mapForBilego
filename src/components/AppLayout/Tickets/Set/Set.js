import React from 'react';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import { Scrollbars } from 'react-custom-scrollbars';

import SetElement from './SetElement';

const Wrapper = styled('div')`
    background-color: #fff;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0;
    height: 645px;
`;
const Scroll = styled(Scrollbars)`
    max-height: 545px;
`;
const Container = styled('ul')`
    list-style: none;
    width: 100%;
`;


@inject('serverDataStore')
class Set extends React.Component{
    render() {
        const { serverDataStore:{ data:{ tickets } } } = this.props;

        return (
            <Wrapper>
                <Scroll>
                    <Container>
                        {tickets.map( el=>(<SetElement element={el} key={el.id} />) )}
                    </Container>
                </Scroll>
            </Wrapper>
        );
    }
}

export default Set;