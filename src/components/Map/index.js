import React from 'react';
import Menu from './Menu'

function Map(props){
    return(
        <>
            <Menu />
            <div id="bilego-tickets--tickets-views map">
                <canvas id="load-animation" height="0" width="0"></canvas>
            </div>
        </>
    );
}

export default Map;