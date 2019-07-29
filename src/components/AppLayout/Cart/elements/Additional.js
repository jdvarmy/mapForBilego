import React, { Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { $css } from '../../../styles/defaults';

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
    color: ${$css.colors.darkGrey};
    font-size: 12px;
    line-height: 18px;
`;

@inject('cartStore')
@observer
class Additional extends React.Component{
    render(){
        const {cartStore: {event}} = this.props;

        return(
            <Fragment>
              {event &&
                <Fragment>
                  <EventName>{event.title}</EventName>
                  <EventDate>{event.date}</EventDate>
                  <EventAddress>{event.address}</EventAddress>
                </Fragment>
              }
            </Fragment>
        );
    }
}

export default Additional;