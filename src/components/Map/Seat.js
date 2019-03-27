import React from 'react'
import {createSeatUID} from "../functions/functions"

export const Seat = (props) => {
    const { el: {cx, cy, r, name, comp} } = props;

    return <circle
        key={createSeatUID(cx, cy)}
        cx={cx}
        cy={cy}
        r={r}
        data-name={name}
        data-component={comp}
        fill="#e5e5e5"
        stroke="#ffffff"></circle>
}