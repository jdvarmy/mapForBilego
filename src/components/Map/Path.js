import React from 'react'
import { observer } from "mobx-react";
import { observable } from "mobx";
import mapStore from '../Store/MapStore';

@observer
class Path extends React.Component {
    @observable hover = false;

    render() {
        const {el: {d, id}, classes} = this.props;

        return (
            <path
            id={id}
            d={d}
            className={'poligon'+ (classes ? ' ' + classes.toString() : '') + (this.hover ? ' active' : '')}
            onMouseOver={()=>this.hover = true}
            onMouseLeave={()=>this.hover = false}

            // onTouchStart={mapStore.handleTouchStart}
            // onTouchMove={mapStore.handleTouchMove}
            // onTouchEnd={mapStore.handleTouchEnd}
            onClick={mapStore.handleClick}

            >
            </path>
        )
    }
}

export default Path;