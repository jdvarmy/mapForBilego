import { observable, action } from 'mobx'

import { getData } from '../../data/fetch'

class ServerDataStore{
    @observable data = null;
    @observable checkoutData = null;

    @action
    getPostData = () => {
        getData().then(data => {
            this.data = data;
        })
    };

    @action
    getWoocommerceCheckout = tickets => {
        let request;


    }
}

export const serverDataStore = new ServerDataStore();