import React from 'react';
import Map from './Map'
import Menu from './Menu'
import MiniMap from './../Minimap'
import ZoomInOutBtns from './../ZoomInOutBtns'

const CreateMap = (props) => {
    const { map_data, map_images:{map, bgmap, minimap} } = props.data;

    return (
        <>
            <Menu/>
            <div id="bt--tickets-views" data-type="map" className="bt-map">
                <div className="bt-container map">
                    <Map
                        map={map[1]}
                        bgmap={bgmap[1]}
                        svgData={map_data.data}
                        elLabels={map_data.elems_labels}
                        elPath={map_data.elems_path}
                        elSeats={map_data.elems_seats}
                    />
                    <MiniMap map={minimap[1]}/>
                    <ZoomInOutBtns />
                </div>
            </div>
        </>
    );
}

export default CreateMap;