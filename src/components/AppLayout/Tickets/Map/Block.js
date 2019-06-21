import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Blocking = styled('div')`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 1;
`;

@inject('basketStore', 'cartStore')
@observer
class Block extends React.Component{
    close = () => {
        const { basketStore:{ setSetWindowMode }, cartStore:{ clear } } = this.props;
        setSetWindowMode(false, null);
        clear();
    };

    render(){
        const { basketStore:{ blockTicketsForm } } = this.props;
        let buffy = null;

        if( blockTicketsForm )
            buffy = ( <Blocking onClick={this.close} /> );

        return <>{buffy}</>;
    }
}

export default Block;