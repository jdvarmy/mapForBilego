import React from 'react';
import { observer, inject } from 'mobx-react'

import Seats from '../Seats/Seats'
import Paths from '../Paths/Paths'

@inject('serverDataStore', 'mapStore')
@observer
class Svg extends React.Component{
    constructor(props){
        super(props);
        this.element = React.createRef();
    }

    oldSize = {w: 0, h: 0};

    componentDidMount() {
        const { mapStore } = this.props;
        const { serverDataStore:{ data } } = this.props;
        const width = data.map_data.data.width,
            height = data.map_data.data.height;

        mapStore.setContainer(document.querySelector('#bt-container') );
        mapStore.setMap(document.querySelector('#btm-map') );
        mapStore.setImage(document.querySelector('#btm-map-image') );
        mapStore.setContentDimensions( parseInt( width ), parseInt( height ) );

        window.addEventListener('resize', () => {this.updateResize()});
        this.updateResize();

        document.ondragstart = function() { return false; };

        this.element.current.addEventListener('touchstart', mapStore.handlePressDrug);
        // this.element.current.addEventListener('touchstart', mapStore.handlePinchZoom);

        mapStore.hammerFunction();
    }

    render() {
        const { serverDataStore:{ data }, mapStore } = this.props;
        const backgroundImage = data.map_images.bgmap[1],
            svgData = data.map_data.data;
        const { width, height } = svgData;
        const { x, y, scale, delay } = mapStore;

        return (
            <React.Fragment>
                <div id="btm-map" className="btm-map" style={{
                    width: parseInt(width),
                    height: parseInt(height),
                    transform: `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px) scale(${scale})`,
                    transition: `${delay}s all ease`,
                }}>
                    <div
                        id="btm-map-image"
                        className="btm-map-image"
                        ref={this.element}
                        // onWheel={mapStore.handleWheel}
                        onMouseDown={mapStore.handleMouseDown}
                        // onTouchStart={mapStore.handleTouchStart}
                    >
                        <svg id="bts-tickets-map" {...svgData} style={{backgroundImage: `url(${backgroundImage})`}}>
                            <defs>
                                <linearGradient id="stripes" x1="0" y1="0" x2="100%" y2="50%">
                                    <stop stopColor="hsl(45,100%,65%)" offset="0"/>
                                    <stop stopColor="hsl(320,100%,65%)" offset="50%"/>
                                    <stop stopColor="hsl(200,100%,60%)" offset="100%"/>
                                </linearGradient>
                            </defs>
                            <Seats />
                            <Paths />
                        </svg>
                    </div>
                </div>
                <div style={{position: 'fixed', width: '100px', height: '100px', left: 0, top: '50px'}}>
                  {mapStore.status}
                </div>
            </React.Fragment>
        );
    }
    
    updateResize = () => {
        const { mapStore } = this.props;
        mapStore.setContainerDimensions ( mapStore.container.offsetWidth, mapStore.container.offsetHeight );

        let wr = mapStore.containerW / mapStore.contentW,
            hr = mapStore.containerH / mapStore.contentH;

        if (wr < hr) mapStore.setFitscale( wr );
        else mapStore.setFitscale( hr );

        if (this.oldSize.w !== mapStore.containerW || this.oldSize.h !== mapStore.containerH) {
            this.oldSize.w = mapStore.container.offsetWidth;
            this.oldSize.h = mapStore.container.offsetHeight;

            mapStore.resetZoom();
        }
    }
}

export default Svg;