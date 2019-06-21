import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import Ticket from './Ticket';

const Wrapper = styled(Scrollbars)`
    max-height: 239px;
    // box-shadow: 0 10px 20px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22);
    // box-sizing: border-box;
`;

class Tickets extends React.Component{
    render(){
        const { tickets } = this.props;

        return(
            <Wrapper>
                { tickets.map( (el, k) => <Ticket ticket={el} key={k} /> ) }
            </Wrapper>
        );
    }
}

export default Tickets;