import React from 'react';
import styled from 'styled-components';

import Menu from './Menu/Menu'
import Svg from './Svg/Svg'
import MiniMap from './Minimap/Minimap'
import ZoomButtons from './ZoomButtons/ZoomButtons'

const Container = styled('div')`
    height: 100%;
`;

const Wrapper = styled(Container)`
    height: 595px;
    width: 100%;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    font-smooth: antialiased;
`;

class Map extends React.PureComponent{

    render() {
        return (
            <>
                <Menu/>
                <Wrapper id="bt--tickets-views">
                    <Container id="bt-container" data-type="map">
                        <Svg />
                        <MiniMap />
                        <ZoomButtons/>
                    </Container>
                </Wrapper>
            </>
        );
    }
}

export default Map;