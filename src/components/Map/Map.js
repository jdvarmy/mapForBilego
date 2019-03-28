import React from 'react';
import './function.css'
import CreateSeats from './CreateSeats'
import CreatePath from './CreatePath'

// import { observable } from 'mobx'
import { observer } from 'mobx-react'
// import { Transition, CSSTransition, ReplaceTransition, TransitionGroup } from 'react-transition-group'

// обьявить в родителе функцию, прокинуть ее до дочернего элемента и в дочернем элементе вызвать родительскую функцию

import { MapStore } from '../Store/MapStore'

const mapStates = new MapStore();

@observer
class Map extends React.Component{

    render() {
        const {elSeats, elPath, elLabels, svgData, bgmap} = this.props;
        const {states: {x, y, scale}} = mapStates;

        return (
            <>
                <div className="btm-map" style={{
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    transformOrigin: '0 0',
                }}>
                    <div className="btm-map-image">
                        <svg id="bts-tickets-map" {...svgData} /*style={{backgroundImage: `url(${bgmap})`}}*/ >
                            <defs></defs>
                            <CreateSeats el={elSeats} />
                            <CreatePath mapStates={{...mapStates.states}} el={elPath} />
                        </svg>
                    </div>
                </div>
            </>
        );
    }
}

export default Map;