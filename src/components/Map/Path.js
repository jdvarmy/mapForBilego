import React from 'react'
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class Path extends React.Component {
    @observable hover = false;

    render() {
        const {el: {d, id}, classes, mapStates} = this.props;

        return (
            <path
            id={id}
            d={d}
            className={'poligon'+ (classes ? ' ' + classes.toString() : '') + (this.hover ? ' active' : '')}
            onMouseOver={()=>this.hover = true}
            onMouseLeave={()=>this.hover = false}
            onClick={()=>{
                console.log(mapStates)
                mapStates.scale = 2
            }}
            >
            </path>
        )
    }
}

export default Path;