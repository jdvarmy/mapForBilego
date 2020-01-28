import React, { Fragment } from 'react';
import styled from 'styled-components';
import Menu from './Menu/Menu';
import Svg from './Svg/Svg';
import MiniMap from './Minimap/Minimap';
import ZoomButtons from './ZoomButtons/ZoomButtons';
import ModalTickets from './ModalTickets/ModalTickets';

const Container = styled('div')`
    height: 100%;
`;

const Wrapper = styled(Container)`
    height: 595px;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-smooth: antialiased;
`;

class Map extends React.PureComponent{

    render() {
        return (
            <Fragment>
                <Menu/>
                <Wrapper id="bt--tickets-views">
                    <Container id="bt-container" data-type="map">
                        <Svg />
                        <MiniMap />
                        <ZoomButtons/>
                    </Container>
                </Wrapper>
                <ModalTickets />
            </Fragment>
        );
    }
}

export default Map;
