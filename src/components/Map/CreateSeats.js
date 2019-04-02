import React from 'react'
import { Seat } from './Seat'
import {createSeatUID} from "../functions/functions"

const CreateSeats = (props) => {
    const { el } = props;

    return(
        <g id="seats">
            {el.map((se,sk)=>{
                return (
                    <g id={se.id} key={se.id} data-name-sector={se.el} data-component={se.comp} className="map-sector">
                        {se.rows.map((re,rk)=>{
                            return(
                                <g key={se.id + re.el} data-name={re.el} data-component={re.comp} className="map-row">
                                    {re.seats.map(
                                        (e,k) => <Seat el={e} key={createSeatUID(e.cx, e.cy)} />
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

export default CreateSeats;