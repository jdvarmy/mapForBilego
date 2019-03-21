import React from 'react'
import Map from './Map'
import Set from './Set'
import Basket from './Basket'

export default class Wrapper extends React.Component{
    render(){
        let {data} = this.props;

        return(
            <div className={['event-content-container', data.type].join(' ')} data-type={data.type}>
                <div className={['event-wrapper', data.type].join(' ')}>
                    {data.type === 'map' ? <Map data={data}/> : <Set data={data}/>}
                    <Basket />
                </div>
            </div>
        );
    }
}