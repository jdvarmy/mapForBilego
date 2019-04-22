import React from 'react'
import ReactDOM from 'react-dom';
import { observer } from "mobx-react/index";
import mapStore from '../../Store/MapStore';
import { PathStore } from '../../Store/PathStore';
import { TooltipPath } from '../../Tooltip/TooltipPath'


@observer
class Path extends React.Component {
    constructor(props){
        super(props);

        this.pathStore = new PathStore();
    }

    componentDidMount(): void {
        const { tickets, el: {text, id} } = this.props,
            el = ReactDOM.findDOMNode(this);
        let ticketArr = [];

        tickets.map( e => {
            if( e.sector === id) ticketArr.push(e)
        } );

        this.tooltip = new TooltipPath({el, ticketArr, text});
    }

    handleHover = () => {
        this.pathStore.onEnter();
        this.tooltip.create();
    };
    handleUnhover = () => {
        this.pathStore.onOver();
        this.tooltip.delete();
    };

    render() {
        const { el: {d, id}, classes } = this.props,
            { pathDisplay } = mapStore,
            { hover } = this.pathStore;

        return (
            <>
                <path
                    id={id}
                    d={d}
                    className={'poligon'+ (classes ? ' ' + classes.toString() : '') + (hover ? ' active' : '')}
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