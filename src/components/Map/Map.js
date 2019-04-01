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
    constructor(props){
        super(props);

    }


    componentDidMount(): void {
        mapStore.container = document.querySelector('#btm-map');

        mapStore.containerW = mapStore.container.offsetWidth;
        mapStore.containerH = mapStore.container.offsetHeight;
        mapStore.contentW = parseInt( this.props.svgData.width );
        mapStore.contentH = parseInt( this.props.svgData.height );
    }

    render() {
        const {elSeats, elPath, elLabels, svgData, bgmap} = this.props;
        const {x, y, scale, centerX, centerY} = mapStore;

        return (
            <>
                <div id="btm-map" className="btm-map" style={{
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                    transformOrigin: `0 0`,
                    transition: '0.4s all ease',
                }}>
                    <div className="btm-map-image" onWheel={mapStore.handleWheel}>
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