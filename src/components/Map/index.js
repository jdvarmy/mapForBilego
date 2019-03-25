import React from 'react';
import Map from './Map'
import Menu from './Menu'
import Minimap from './../Minimap'

export default function CreateMap(props){

    return(
        <>
            {console.log('CreateMap', props)}
            <Menu />
            <div id="bt--tickets-views" data-type="map" className="bt-map">
                <div className="bt-container map">
                    <Map />
                    <Minimap />
                </div>
            </div>
        </>
    );
}