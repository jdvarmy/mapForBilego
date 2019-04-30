import React from 'react'
import ReactDOM from 'react-dom';
import { observer } from "mobx-react/index";
import mapStore from '../../Store/MapStore';
import { PathStore } from '../../Store/PathStore';
import { TooltipPath } from '../../Tooltip/TooltipPath'
import basketStore from "../../Store/BasketStore";


@observer
class Path extends React.Component {
    constructor(props){
        super(props);
        const {el:{ id }, tickets} = this.props;

        this.pathStore = new PathStore();
        this.pathStore.init({tickets, id});
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

    handlerSpecialClick = () => {
        const { setSetWindowMode } = basketStore;
        const { ticket } = this.pathStore;
        setSetWindowMode(true, ticket);
    };

    render() {
        const { el: {d, id}, classes } = this.props,
            { pathDisplay } = mapStore,
            { hover, ticket } = this.pathStore;

        return (
            <>
                <path
                    id={id}
                    d={d}
                    className={'poligon'+ (classes ? ' ' + classes.toString() : '') + (hover ? ' active' : '')}
                    onMouseOver={this.handleHover}
                    onMouseLeave={this.handleUnhover}
                    style={pathDisplay ? {'display': 'none'} : {}}
                    onClick={ticket ? this.handlerSpecialClick : mapStore.handleClick}
                    onTouchStart={ticket ? this.handlerSpecialClick : mapStore.handleClick}
                >
                </path>
            </>
        )
    }
}

export default Path;