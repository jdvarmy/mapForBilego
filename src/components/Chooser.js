import React, { Component } from 'react'
import Loading from './Loading'
import Wrapper from './Wrapper'
import './chooser.css'
import { observer } from 'mobx-react'
import { ServerStore } from './Store/ServerStore'


const store = new ServerStore();
store.getPostData();

@observer
class Chooser extends Component {

    render() {
        return (
            <div id="bilego-sell-tickets">
                {store.data ? <Wrapper data={store.data} /> : <Loading />}
            </div>
        );
    }
}

export default Chooser;