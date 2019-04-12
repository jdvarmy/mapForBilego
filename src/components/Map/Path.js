import React from 'react'
import ReactDOM from 'react-dom';
import { observer } from "mobx-react";
import { observable } from "mobx";
import mapStore from '../Store/MapStore';
import Tooltip from '../Tooltip'


@observer
class Path extends React.Component {
    @observable hover = false;

    handleHover = () => {
        this.hover = true;

        const { tickets, el: {text, id} } = this.props;
        const el = ReactDOM.findDOMNode(this);
        let pathTickets = [];
        tickets.map( e => {
            if( e.sector === id) pathTickets.push(e)
        } );
        Tooltip.create(el, pathTickets, text);
    };
    handleUnhover = () => {
        this.hover = false;
        Tooltip.delete();
    };

    render() {
        const {el: {d, id}, classes} = this.props;
        const {pathDisplay} = mapStore;

        return (
            <>
                <path
                    id={id}
                    d={d}
                    className={'poligon'+ (classes ? ' ' + classes.toString() : '') + (this.hover ? ' active' : '')}
                    onMouseOver={this.handleHover}
                    onMouseLeave={this.handleUnhover}
                    style={pathDisplay ? {'display': 'none'} : {}}
                    onClick={mapStore.handleClick}
                    onTouchStart={mapStore.handleClick}
                >
                </path>
            </>
        )
    }
}

export default Path;