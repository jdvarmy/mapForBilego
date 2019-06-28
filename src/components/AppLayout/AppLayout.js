import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import Loading from './Loading/Loading'
import Tickets from './Tickets/Tickets'
import ThankYou from './ThankYou/ThankYou'

const Wrapper = styled('div')`
    background-color: #fff;
    position:relative;
    width: 100%;
    overflow: hidden;
`;

@inject('serverDataStore', 'thankYouStore')
@observer
class AppLayout extends React.Component {
    constructor(props){
        super(props);

        const { serverDataStore:{ getPostData } } = this.props;
        getPostData();
    }

    render() {
        const { serverDataStore:{ loading, forceLoading }, thankYouStore:{ thankYou } } = this.props;
        let content;

        if( thankYou )
            content = <ThankYou />;
        else
            content = !forceLoading ? <Tickets /> : <><Tickets /><Loading /></>;

        return (
            <Wrapper id="bilego-sell-tickets">
                {!loading ? content : <Loading />}
            </Wrapper>
        );
    }
}

export default AppLayout;