import React from 'react';
import { observer } from "mobx-react";
import BasketStore from '../Store/BasketStore'

@observer
class Block extends React.Component{

    close = () => {
        const { setSetWindowMode } = BasketStore;
        setSetWindowMode(false, []);
    };

    render(){
        let buffy = null;
        const { setWindowMode } = BasketStore;

        if( setWindowMode )
            buffy = ( <div className="blocking" onClick={this.close} /> );

        return <>{buffy}</>;
    }
}

export default Block;