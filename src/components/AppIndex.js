import React from 'react'
import { Provider } from 'mobx-react'

import AppLayout from './AppLayout/AppLayout'
import { serverDataStore } from './stores/ServerDataStore'
import { mapStore } from './stores/MapStore'
import { basketStore } from './stores/BasketStore'
import { informerStore } from './stores/InformerStore'
import { cartStore } from './stores/CartStore'
import { thankYouStore } from './stores/ThankYouStore'
import { dataStore } from './stores/DataStore'

import './chooser.css'

class AppIndex extends React.Component{
    render(){
        return (
            <Provider
                serverDataStore={serverDataStore}
                basketStore={basketStore}
                mapStore={mapStore}
                informerStore={informerStore}
                cartStore={cartStore}
                thankYouStore={thankYouStore}
                dataStore={dataStore}
            >
                <AppLayout />
            </Provider>
        );
    };
}

export default AppIndex;