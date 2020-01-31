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
    
    // touch-action: none;
    // user-select: none;
    // -webkit-user-drag: none;
    // -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;
const Container = styled.div`
  height: 100%;
`;

class Map extends React.PureComponent{
  render() {
    return (
        <Fragment>
            <Menu/>
            <Wrapper id="bt--tickets-views">
                <Container id="bt-container" data-type="map">
                    <Svg />
                    {/*<MiniMap />*/}
                    <ZoomButtons/>
                </Container>
            </Wrapper>
            <ModalTickets />
        </Fragment>
    );
  }
}

export default Map;
