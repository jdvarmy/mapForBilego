import React, { Component } from 'react'
import Loading from './Loading'
import Wrapper from './Wrapper'
import './chooser.css'
import { observer } from 'mobx-react'
import serverStore from './Store/ServerStore'

@observer
class Chooser extends Component {

    render() {
        return (
            <div id="bilego-sell-tickets">
                {serverStore.data ? <Wrapper data={serverStore.data} /> : <Loading />}
            </div>
        );
    }
}

export default Chooser;