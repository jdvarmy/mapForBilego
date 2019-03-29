import React from 'react';
import './function.css'
import CreateSeats from './CreateSeats'
import CreatePath from './CreatePath'

// import { observable } from 'mobx'
import { observer } from 'mobx-react'
// import { Transition, CSSTransition, ReplaceTransition, TransitionGroup } from 'react-transition-group'

import mapStore from '../Store/MapStore'

@observer
class Map extends React.Component{

    componentDidMount(): void {
        const container = document.getElementById('btm-map');

        mapStore.containerW = container.offsetWidth;
        mapStore.containerH = container.offsetHeight;
        mapStore.contentW = parseInt( this.props.svgData.width );
        mapStore.contentH = parseInt( this.props.svgData.height );
    }

    render() {
        const {elSeats, elPath, elLabels, svgData, bgmap} = this.props;
        const {x, y, scale, centerX, centerY} = mapStore;

        return (
            <>
                <div id="btm-map" className="btm-map" style={{
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    transformOrigin: `${centerX}% ${centerY}%`,
                    transition: '0.1s all ease-out',
                }}>
                    <div className="btm-map-image">
                        <svg id="bts-tickets-map" {...svgData} /*style={{backgroundImage: `url(${bgmap})`}}*/ >
                            <defs></defs>
                            <CreateSeats el={elSeats} />
                            <CreatePath el={elPath} />
                        </svg>
                    </div>
                </div>
            </>
        );
    }
}

export default Map;