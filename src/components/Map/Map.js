import React from 'react';
import PinchZoomPan from 'pinch-zoom-pan'

export default function Map(props){

    return(
        <>
            {console.log('Map', props)}
            <div className="btm-map btm-zoomable">
                <div className="btm-map-image">
                    {/*<svg {...props.svgData} style={ {backgroundImage: `url(${props.bgmap})`} }>*/}
                        <Usage width={200} height={300}/>
                    {/*</svg>*/}
                </div>
            </div>
        </>
    );
}

const Usage = ({width, height}) => (
    <div>
        <PinchZoomPan width={width} height={height}>
            {(x, y, scale) => (
                <img
                    src={`https://placekitten.com/${width}/${height}`}
                    style={{
                        pointerEvents: scale === 1 ? 'auto' : 'none',
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                        transformOrigin: '0 0',
                    }} />
            )}
        </PinchZoomPan>
    </div>
);