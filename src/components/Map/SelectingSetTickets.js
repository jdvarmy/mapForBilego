import React from 'react';
import { observer } from "mobx-react";
import { SeatStore } from "../Store/SeatStore"

@observer
class SelectingSetTickets extends React.Component{
    componentDidMount(): void {
        this.block = document.querySelector('.event-content-container.map');
    }

    render(){
        // SeatStore вызывается для каждого "места" в отдельности. поэтому нужно передавать состояние из Seat.js
        const { setWindowMode } = SeatStore;
        setWindowMode && console.log(setWindowMode)
        return(
            <div className="blocker"/>
        );
    }
}

export default SelectingSetTickets;