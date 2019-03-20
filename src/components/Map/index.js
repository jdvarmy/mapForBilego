import React from 'react';

function Map(props){
    return(
        <>
            <div className="meta map-meta"></div>
            <div id="bilego-tickets--tickets-views map">
                <canvas id="load-animation" height="0" width="0"></canvas>
            </div>
        </>
    );
}

export default Map;