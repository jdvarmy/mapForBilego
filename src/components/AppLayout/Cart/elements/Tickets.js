import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import Ticket from './Ticket';
import {inject, observer} from "mobx-react";

const Wrapper = styled(Scrollbars)`
    max-height: 239px;
`;

@inject('cartStore')
@observer
class Tickets extends React.Component{
    render(){
        const {cartStore: {tickets}} = this.props;

        return(
            <Wrapper>
                {tickets && tickets.map( (el, k) => <Ticket ticket={el} key={k} /> )}
            </Wrapper>
        );
    }
}

export default Tickets;