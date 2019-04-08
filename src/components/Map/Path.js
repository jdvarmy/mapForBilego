import React from 'react'
import { observer } from "mobx-react";
import { observable } from "mobx";
import mapStore from '../Store/MapStore';

@observer
class Path extends React.Component {
    @observable hover = false;

    render() {
        const {el: {d, id}, classes} = this.props;
        const {pathDisplay} = mapStore;

        return (
            <path
                id={id}
                d={d}
                className={'poligon'+ (classes ? ' ' + classes.toString() : '') + (this.hover ? ' active' : '')}
                onMouseOver={()=>this.hover = true}
                onMouseLeave={()=>this.hover = false}
                style={pathDisplay ? {'display': 'none'} : {}}
                onClick={mapStore.handleClick}
                onTouchStart={mapStore.handleClick}
            >
            </path>
        )
    }
}

export default Path;