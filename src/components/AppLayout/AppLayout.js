import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import {$css} from '../styles/defaults';

import Loading from './Loading/Loading';
import Tickets from './Tickets/Tickets';
import ThankYou from './ThankYou/ThankYou';
import Error from './Error/Error';

const Wrapper = styled('div')`
    background-color: #fff;
    position:relative;
    width: 100%;
    height: ${$css.sizes.containerH}
    overflow: hidden;
`;

@inject('serverDataStore', 'thankYouStore')
@observer
class AppLayout extends React.Component {
    constructor(props){
        super(props);

        const {serverDataStore: {getPostData}} = this.props;
        getPostData();
    }

    render() {
        const {serverDataStore: {error, data}, thankYouStore: {thankYou}} = this.props;

        return (
            <Wrapper id="bilego-sell-tickets">
                {data && <Tickets />}
                {thankYou && <ThankYou />}
                {error && <Error />}
                <Loading src={1}/>
            </Wrapper>
        );
    }
}

export default AppLayout;