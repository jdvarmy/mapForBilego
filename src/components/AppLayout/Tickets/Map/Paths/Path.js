import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { PathStore } from '../stores/PathStore';
import { TooltipPath } from '../Tooltip/TooltipPath';

import { $css } from '../../../../styles/defaults';

const Element = styled('path')`
    fill: transparent;
    transition: all .3s;
    ${props=>{
        if( props.pathDisplay ) return `display: none`;
        if( props.hover ) return `
            fill:transparent;
            opacity: 1;
            stroke: ${$css.colors.red};
            stroke-width: 25;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-opacity: .7;
            cursor: pointer;
        `;
    }}
`;

@inject('serverDataStore', 'mapStore', 'basketStore', 'dataStore')
@observer
class Path extends React.Component {
    constructor(props){
        super(props);
        const { el:{ id }, serverDataStore:{ data: { tickets } } } = props;

        this.pathStore = new PathStore();
        this.pathStore.init({tickets, id});
    }

    componentDidMount(){
        const { el: {text, id}, serverDataStore:{ data: { tickets } } } = this.props,
            el = ReactDOM.findDOMNode(this);
        let ticketArr = [];

        if( tickets !== null ) {
            tickets.map(e => e.sector === id && ticketArr.push(e));
            this.tooltip = new TooltipPath({el, ticketArr, text});
        }
    }

    handleHover = () => {
        const { dataStore:{ isSmallScreen } } = this.props;
        this.pathStore.onEnter();
        !isSmallScreen && this.tooltip.create();
    };
    handleUnhover = () => {
        this.pathStore.onOver();
        this.tooltip.delete();
    };

    handlerSpecialClick = () => {
        const { basketStore:{ getModalTickets } } = this.props;
        const { ticket } = this.pathStore;

        getModalTickets(ticket);
    };

    render() {
        const { el: {d, id} } = this.props,
            { mapStore:{ pathDisplay, handleClick } } = this.props,
            { hover, ticket } = this.pathStore;

        const haveTickets =
          Array.isArray(ticket)
            ? ticket.filter(e=>e.stock>0).length>0
            : ticket.stock>0;

        return (
            <Element
                d={d}
                id={id}
                hover={hover}
                pathDisplay={pathDisplay}
                onMouseOver={this.handleHover}
                onMouseLeave={this.handleUnhover}
                onClick={Array.isArray(ticket) && ticket.length>0 && haveTickets ? this.handlerSpecialClick : handleClick}
            />
        )
    }
}

export default Path;
