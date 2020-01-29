import React, { Fragment } from 'react';
import styled from 'styled-components';
import Menu from './Menu/Menu';
import Svg from './Svg/Svg';
import MiniMap from './Minimap/Minimap';
import ZoomButtons from './ZoomButtons/ZoomButtons';
import ModalTickets from './ModalTickets/ModalTickets';

const Wrapper = styled.div`
    height: ${window.innerHeight}px;
    width: 100%;
    overflow: hidden;
    font-smooth: antialiased;
    position: fixed;
    top: 0;
    left: 0;
`;

class Map extends React.PureComponent{
  render() {
    return (
        <Fragment>
            <Menu/>
            <Wrapper id="bt--tickets-views">
                <div id="bt-container" data-type="map">
                    <Svg />
                    <MiniMap />
                    <ZoomButtons/>
                </div>
            </Wrapper>
            <ModalTickets />
        </Fragment>
    );
  }
}

export default Map;
