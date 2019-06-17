import { observable, action } from 'mobx';

import { getData, getCheckout } from '../../data/fetch';

class ServerDataStore{
    @observable data = null;
    @observable checkoutData = null;

    @action
    getPostData = () => {
        getData().then(data => {
            this.data = data;
            // console.log(data)
        })
    };

    @action
    getCheckoutData = (data) => {
        getCheckout(data).then( data => {
            // this.checkoutData = data;
            console.log(data)
        })
    };
}

export const serverDataStore = new ServerDataStore();