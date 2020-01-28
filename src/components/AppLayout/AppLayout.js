import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { $css } from '../styles/defaults';
import Loading from './Loading/Loading';
import Tickets from './Tickets/Tickets';

const Wrapper = styled('div')`
    background-color: ${$css.colors.white};
    position:relative;
    width: 100%;
    height: ${$css.sizes.containerH};
    overflow: hidden;
`;

@inject('serverDataStore')
@observer
class AppLayout extends React.Component {
    constructor(props){
        super(props);
        const {serverDataStore: {getPostData}} = this.props;
        getPostData();
    }

    render() {
        const {serverDataStore: {data}} = this.props;
        return (
            <Wrapper id="bilego-sell-tickets">
                {data && <Tickets />}
                <Loading />
            </Wrapper>
        );
    }
}

export default AppLayout;
