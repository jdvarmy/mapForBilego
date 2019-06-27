import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import Loading from './Loading/Loading'
import Tickets from './Tickets/Tickets'

const Wrapper = styled('div')`
    background-color: #fff;
    position:relative;
    width: 100%;
    overflow: hidden;
`;

@inject('serverDataStore')
@observer
class AppLayout extends React.Component {
    constructor(props){
        super(props);

        const { serverDataStore:{ getPostData } } = this.props;
        getPostData();
    }

    render() {
        const { serverDataStore:{ loading, forceLoading } } = this.props;
        const content = !forceLoading ? <Tickets /> : <><Tickets /><Loading /></>;

        return (
            <Wrapper id="bilego-sell-tickets">
                {!loading ? content : <Loading />}
            </Wrapper>
        );
    }
}

export default AppLayout;