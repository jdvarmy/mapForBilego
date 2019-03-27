import React from 'react';
import './function.css'
// import PinchZoomPan from './../functions/PinchZoomPan'

import CreateSeats from './CreateSeats'
import CreatePath from './CreatePath'

export default class Map extends React.Component{

    render() {
        const {elSeats, elPath, elLabels, svgData: {width, height}} = this.props;

        return (
            <>
                {console.log('Map', this.props)}
                <div className="btm-map btm-zoomable">
                    <div className="btm-map-image">
                        {/*<PinchZoomPan width={parseInt(width)} height={parseInt(height)}>*/}
                            {/*{(x, y, scale) =>(*/}
                                {/*<svg {...this.props.svgData} style={{*/}
                                    {/*backgroundImage: `url(${this.props.bgmap})`,*/}
                                    {/*pointerEvents: scale === 1 ? 'auto' : 'none',*/}
                                    {/*transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,*/}
                                    {/*transformOrigin: '0 0',*/}
                                {/*}} >*/}
                                    {/*<CreateSeats el={elSeats} />*/}
                                {/*</svg>*/}
                            {/*)}*/}
                        {/*</PinchZoomPan>*/}

                        <svg {...this.props.svgData} style={{backgroundImage: `url(${this.props.bgmap})`}} >
                            <CreateSeats el={elSeats} />
                            <CreatePath el={elPath} />
                        </svg>
                    </div>
                </div>
            </>
        );
    }
}