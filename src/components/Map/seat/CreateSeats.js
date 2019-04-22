import React from 'react'
import Seat from './Seat'
// import {createSeatUID} from "../functions/functions"

class CreateSeats extends React.PureComponent{
    render() {
        const {el, tickets} = this.props;

        return (
            <g id="seats">
                {el.map((se, sk) => {
                    return (
                        <g id={se.id} key={se.id} data-name-sector={se.el} data-component={se.comp}
                           className="map-sector">
                            {se.rows.map((re, rk) => {
                                return (
                                    <g key={se.id + re.el} data-name={re.el} data-component={re.comp}
                                       className="map-row">
                                        {re.seats.map(
                                            (e, k) => {
                                                // const id = createSeatUID(e.cx, e.cy);
                                                const id = e.uid;
                                                return <Seat el={e} key={id} id={id} sector={se.id} tickets={tickets}/>
                                            }
                                        )}
                                    </g>
                                )
                            })}
                        </g>
                    )
                })}
            </g>
        );
    }
}

export default CreateSeats;