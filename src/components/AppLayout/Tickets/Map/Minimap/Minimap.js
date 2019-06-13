import React from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Wrapper = styled('div')`
    width: 140px;
    position: absolute;
    top: -1px;
    right: -1px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    opacity: 0;
    overflow: hidden;
    transition: opacity 0.4s;
    user-select: none;
`;

const Container = styled('div')`
    line-height: 0;
`;

const Overlay = styled('div')`
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const Img = styled('img')`
    width: 100%;
    height: 100%;
    vertical-align: middle;
`;

const Background = styled(Img)`
    width: 140px;
    filter: blur(2px);
`;

const Image = styled(Img)`
    position: absolute;
    opacity: 1;
    top: 0;
    left: 0;
    background-color: #ffffff;
`;

const Clip = styled(Overlay)`
    background-color: inherit;
`;

@inject('mapStore', 'serverDataStore')
@observer
class MiniMap extends React.Component {
    componentDidMount(): void {
        const { mapStore:{ setContainerMinimap } } = this.props;
        setContainerMinimap( ReactDOM.findDOMNode(this) );
    }
    
    render() {
        const {
            mapStore:{ miniMap:{ top, right, bottom, left } },
            serverDataStore: { data: { map_images: { minimap } } }
        } = this.props;

        return (
            <Wrapper>
                <Container>
                    <Background src={minimap[1]} />
                    <Overlay />
                    <Clip style={{
                            clip: `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`,
                            transition: `.1s all ease`,
                        }}
                    >
                        <Image
                            src={minimap[1]}
                        />
                    </Clip>
                </Container>
            </Wrapper>
        );
    }
}

export default MiniMap;