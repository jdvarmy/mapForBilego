import React from 'react'
import CreateMap from './Map'
import CreateSet from './Set'
import Basket from './Basket'
import Layout from './Layout'
import { CSSTransition } from 'react-transition-group'
import SelectingSetTickets from './Map/SelectingSetTickets'
import Block from './Map/Block'


class Wrapper extends React.Component{
    render(){
        const {data} = this.props;

        return(
            <CSSTransition
                in={true}
                appear={true}
                timeout={800}
                classNames="fade"
            >
                <>
                    <div className={['event-content-container', data.type].join(' ')} data-type={data.type}>
                        <div className={['event-wrapper', data.type].join(' ')}>
                            {data.type === 'map' ? <CreateMap data={data}/> : <CreateSet data={data}/>}
                            <Basket />
                        </div>
                    </div>
                    <Block />
                    <SelectingSetTickets />
                    <Layout />
                </>
            </CSSTransition>
        );
    }
}

export default Wrapper;