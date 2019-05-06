import React from 'react'
import { inject } from 'mobx-react'
import styled from 'styled-components';

import Seat from './Seat'

const Wrapper = styled('g')``;
const WrapperSectorGroup = styled('g')``;
const WrapperRowGroup = styled('g')``;

@inject('serverDataStore')
class Seats extends React.PureComponent{
    render() {
        const seats = this.props.serverDataStore.data.map_data.elems_seats;

        return (
            <Wrapper id="seats">
                {seats.map(se =>
                    (
                    <WrapperSectorGroup id={se.id} key={se.id} data-name-sector={se.el} data-component={se.comp}>
                        {se.rows.map(re =>
                            (
                            <WrapperRowGroup key={se.id + re.el} data-name={re.el} data-component={re.comp}>
                                {re.seats.map(e => <Seat el={e} key={e.uid} id={e.uid} sector={se.id}/>)}
                            </WrapperRowGroup>
                            )
                        )}
                    </WrapperSectorGroup>
                    )
                )}
            </Wrapper>
        );
    }
}

export default Seats;