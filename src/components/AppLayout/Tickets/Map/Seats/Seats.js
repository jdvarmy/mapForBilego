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
                {Object.keys(seats).map(se =>
                    (<WrapperSectorGroup id={seats[se].id} key={seats[se].id} data-name-sector={seats[se].el} data-component={seats[se].comp}>
                        {Object.keys(seats[se].rows).map(re =>
                            (
                            <WrapperRowGroup key={seats[se].id + seats[se].rows[re].el} data-name={seats[se].rows[re].el} data-component={seats[se].rows[re].comp}>
                                {seats[se].rows[re].seats.map(e => <Seat el={e} key={e.uid} id={e.uid} row={seats[se].rows[re].el} sector={seats[se].id}/>)}
                            </WrapperRowGroup>
                            )
                        )}
                    </WrapperSectorGroup>)
                )}
            </Wrapper>
        );
    }
}

export default Seats;
