import React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import mapStore from '../Store/MapStore'

@observer
class MiniMap extends React.Component {
    componentDidMount(): void {
        mapStore.containerMinimap = document.querySelector('.bt-minimap');
        mapStore.updateMinimap();
    }
    
    render() {
        const {miniMap:{top, right, bottom, left}} = mapStore;

        return (
            <div className="bt-minimap">
                <div className="bt-minimap-wr">
                    <img className="bt-minimap-background" src={this.props.map} alt="background map image"/>
                    <div className="bt-minimap-overlay"></div>
                    <img
                        className="bt-minimap-active"
                        src={this.props.map}
                        alt="map image active"
                        style={{
                            clip: `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`,
                            transition: `.2s all ease`,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default MiniMap;