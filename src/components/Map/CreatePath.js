import React from 'react'
import Path from './Path'

class CreateSeats extends React.Component {
    render() {
        const {el, tickets} = this.props;
        return (
            <g id="poligons">
                {el.map((e, k) => {
                    return <Path el={e} key={e.id} tickets={tickets} />
                })}
            </g>
        );
    }
}

export default CreateSeats;