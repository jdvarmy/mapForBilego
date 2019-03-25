import React from 'react';

export default function Map(props){
    return(
        <>
            {console.log('Map', props)}
            <div className="btm-map btm-zoomable">
                <div className="btm-map-image">
                    <svg></svg>
                </div>
            </div>
        </>
    );
}