import React from 'react';
import { observer, inject } from 'mobx-react'

import Seats from '../Seats/Seats'
import Paths from '../Paths/Paths'

@inject('serverDataStore', 'mapStore')
@observer
class Svg extends React.Component{
    constructor(props){
        super(props);

        this.oldSize = {w: 0, h: 0}
    }

    componentDidMount(): void {
        const { mapStore } = this.props;
        const { serverDataStore:{ data } } = this.props;
        const width = data.map_data.data.width,
            height = data.map_data.data.height;

        mapStore.setContainer (document.querySelector('#bt-container') );
        mapStore.setMap (document.querySelector('#btm-map') );

        mapStore.setContentDimensions ( parseInt( width ), parseInt( height ) );

        window.addEventListener('resize', this.updateResize);
        this.updateResize();

        document.ondragstart = function() { return false; }
    }

    render() {
        const { serverDataStore:{ data } } = this.props;
        const backgroundImage = data.map_images.bgmap[1],
            svgData = data.map_data.data;
        const { width, height } = svgData;
        const { mapStore } = this.props;
        const { x, y, scale, delay } = mapStore;

        return (
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
                    <svg id="bts-tickets-map" {...svgData} /*style={{backgroundImage: `url(${backgroundImage})`}}*/>
                        <defs />
                        <Seats />
                        <Paths />
                    </svg>
                </div>
            </div>
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