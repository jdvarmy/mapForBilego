import React from 'react'
import CreateMap from './Map'
import CreateSet from './Set'
import Basket from './Basket'
import Layout from './Layout'

export default class Wrapper extends React.Component{
    render(){
        let {data} = this.props;

        return(
            <>
                <div className={['event-content-container', data.type].join(' ')} data-type={data.type}>
                    <div className={['event-wrapper', data.type].join(' ')}>
                        {data.type === 'map' ? <CreateMap data={data}/> : <CreateSet data={data}/>}
                        <Basket />
                    </div>
                </div>
                <Layout />
            </>
        );
    }
}