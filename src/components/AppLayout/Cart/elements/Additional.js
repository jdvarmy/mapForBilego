import React from 'react';
import styled from 'styled-components';

const EventName = styled('div')`
    font-size: 17px;
    font-weight: 700;
    line-height: 21px;
`;
const EventDate = styled('div')`
    margin-top: 4px;
    font-size: 13px;
    line-height: 15px;
`;
const EventAddress = styled('div')`
    margin-top: 4px;
    color: #676662;
    font-size: 12px;
    line-height: 18px;
`;

class Additional extends React.Component{
    render(){
        const { event:{ title, date, address } } = this.props;

        return(
            <>
                <EventName>{title}</EventName>
                <EventDate>{date}</EventDate>
                <EventAddress>{address}</EventAddress>
            </>
        );
    }
}

export default Additional;