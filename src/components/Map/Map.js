import React from 'react';
import './function.css'
import CreateSeats from './CreateSeats'
import CreatePath from './CreatePath'
import { observer } from 'mobx-react'
import mapStore from '../Store/MapStore'

@observer
class Map extends React.Component{
    constructor(props){
        super(props);

        this.oldSize = {w: 0, h: 0}
    }


    componentDidMount(): void {
        mapStore.container = document.querySelector('.bt-container.map');
        mapStore.map = document.querySelector('#btm-map');

        mapStore.contentW = parseInt( this.props.svgData.width );
        mapStore.contentH = parseInt( this.props.svgData.height );

        window.addEventListener('resize', this.updateResize);
        this.updateResize();

        document.ondragstart = function() { return false; }
    }

    render() {
        const {elSeats, elPath, svgData, bgmap, svgData:{width, height}, tickets} = this.props;
        const {x, y, scale, delay} = mapStore;

        return (
            <>
                <div id="btm-map" className="btm-map" style={{
                    width: parseInt(width),
                    height: parseInt(height),
                    transform: `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px) scale(${scale})`,
                    transition: `${delay}s all ease`,
                }}>
                    <div
                        className="btm-map-image"
                        ref={(e) => (this.element = e)}
                        onWheel={mapStore.handleWheel}
                        onMouseDown={mapStore.handleMouseDown}
                        onTouchStart={mapStore.handleTouchStart}
                    >
                        <svg id="bts-tickets-map" {...svgData} /*style={{backgroundImage: `url(${bgmap})`}} */>
                            <defs></defs>
                            <CreateSeats el={elSeats} tickets={tickets} />
                            <CreatePath el={elPath} tickets={tickets} />
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