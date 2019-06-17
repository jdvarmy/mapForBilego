import React from 'react'
import { Provider } from 'mobx-react'

import AppLayout from './AppLayout/AppLayout'
import { serverDataStore } from './stores/ServerDataStore'
import { mapStore } from './stores/MapStore'
import { basketStore } from './stores/BasketStore'
import { informerStore } from './stores/InformerStore'
import { cartStore } from './stores/CartStore'

import './chooser.css'

class AppIndex extends React.Component{
    render(){
        return (
            <Provider serverDataStore={serverDataStore} basketStore={basketStore} mapStore={mapStore} informerStore={informerStore} cartStore={cartStore}>
                <AppLayout />
            </Provider>
        );
    };
}

export default AppIndex;