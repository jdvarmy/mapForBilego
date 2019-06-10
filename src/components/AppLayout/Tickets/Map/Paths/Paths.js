import React from 'react'
import { inject } from 'mobx-react'
import styled from 'styled-components';

import Path from './Path'

const Element = styled('g')``;

@inject('serverDataStore')
class Paths extends React.PureComponent {
    render() {
        const paths = this.props.serverDataStore.data.map_data.elems_path;

        return (
            <Element id="poligons">
                {paths.map(el => {
                    return <Path el={el} key={el.id} />
                })}
            </Element>
        );
    }
}

export default Paths;