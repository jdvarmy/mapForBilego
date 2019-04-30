import React from 'react';
import {observer} from "mobx-react";
import mapStore from '../Store/MapStore'

@observer
class ZoomButtons extends React.Component {
    render() {
        const disabledIn = mapStore.scale === mapStore.maxscale ? 'disabled' : '';
        const disabledOut = mapStore.scale === mapStore.fitscale ? 'disabled' : '';
        return (
            <div className="bt-zoom-buttons">
                <a href='#'
                   className={['bt-zoomin-button', disabledIn].join(' ')}
                   onClick={mapStore.handleClickZoomIn}
                   onTouchStart={mapStore.handleClickZoomIn}
                ></a>
                <a href='#'
                   className={['bt-zoomout-button', disabledOut].join(' ') }
                   onClick={mapStore.handleClickZoomOut}
                   onTouchStart={mapStore.handleClickZoomOut}
                ></a>
            </div>
        );
    }
}

export default ZoomButtons;