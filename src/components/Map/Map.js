import React from 'react';
import './function.css'
import CreateSeats from './CreateSeats'
import CreatePath from './CreatePath'

// import { observable } from 'mobx'
import { observer } from 'mobx-react'
// import { Transition, CSSTransition, ReplaceTransition, TransitionGroup } from 'react-transition-group'

import mapStore from '../Store/MapStore'
import * as Hammer from "hammerjs";

@observer
class Map extends React.Component{
    constructor(props){
        super(props);

        this.oldSize = {w: 0, h: 0}
    }


    componentDidMount(): void {
        mapStore.container = document.querySelector('.bt-container.map');

        mapStore.contentW = parseInt( this.props.svgData.width );
        mapStore.contentH = parseInt( this.props.svgData.height );

        window.addEventListener('resize', this.updateResize);
        this.updateResize();


        // this.hammer = new Hammer.Manager(this.element);
        // // this.width = this.element.clientWidth;
        // const pinch = new Hammer.Pinch();
        // const pan = new Hammer.Pan();
        // const doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
        // pinch.recognizeWith(pan);
        // this.hammer.add([pinch, pan, doubleTap]);
        // this.hammer.on('pinchstart', mapStore.handleZoomStart);
        // this.hammer.on('pinchmove', mapStore.handleZoom);
        // this.hammer.on('pinchmove panmove', mapStore.handlePan);
        // this.hammer.on('pinchend panend', mapStore.handleSave);
        // this.hammer.on('doubletap', mapStore.handleReset);
    }

    render() {
        const {elSeats, elPath, elLabels, svgData, bgmap, svgData:{width, height}} = this.props;
        const {x, y, scale, delay} = mapStore;

        return (
            <>
                <div id="btm-map" className="btm-map" style={{
                    width: parseInt(width),
                    height: parseInt(height),
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                    transition: `${delay}s all ease`,
                }}>
                    <div
                        className="btm-map-image"
                        ref={(e) => (this.element = e)}
                        onWheel={mapStore.handleWheel}
                        onMouseDown={mapStore.handleMouseDown}
                    >
                        <svg id="bts-tickets-map" {...svgData} /*style={{backgroundImage: `url(${bgmap})`}} */>
                            <defs></defs>
                            <CreateSeats el={elSeats} />
                            <CreatePath el={elPath} />
                        </svg>
                    </div>
                </div>
            </>
        );
    }
    
    updateResize = () => {
        mapStore.containerW = mapStore.container.offsetWidth;
        mapStore.containerH = mapStore.container.offsetHeight;

        let wr = mapStore.containerW / mapStore.contentW,
            hr = mapStore.containerH / mapStore.contentH;

        if (wr < hr) mapStore.fitscale = wr;
        else mapStore.fitscale = hr;

        if (this.oldSize.w !== mapStore.containerW || this.oldSize.h !== mapStore.containerH) {

            this.oldSize.w = mapStore.container.offsetWidth;
            this.oldSize.h = mapStore.container.offsetHeight;

            mapStore.resetZoom();
        }
    }
}

export default Map;