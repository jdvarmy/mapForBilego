import React from 'react'
import Path from './Path'

class CreateSeats extends React.Component {
    render() {
        const {el: {path, path_free}, mapStates} = this.props;

        return (
            <g id="poligons">
                {path.map((e, k) => {
                    return <Path mapStates={mapStates} el={e} key={e.id} />
                })}
                {path_free.map((e, k) => {
                    return <Path mapStates={mapStates} el={e} key={e.id} classes={['svg-poligon-free']}/>
                })}
            </g>
        );
    }
}

export default CreateSeats;