import { observable, action } from 'mobx';

import { getData, getCheckout } from '../../data/fetch';

class ServerDataStore{
    @observable data = null;
    @observable checkoutData = null;

    @observable loading = true;
    @observable forceLoading = false;

    @action
    getPostData = () => {
        this.startLoading();

        getData().then(data => {
            if( data ) {
                this.data = data;
                this.stopLoading();
            }
        });

        this.checkoutData = null;
    };

    @action
    getCheckoutData = (data) => {
        this.startForceLoading();

        getCheckout(data).then( data => {
            console.log(data)

            this.checkoutData = data;
            setTimeout(() => {
                this.stopForceLoading()
            }, 3500);

        });
    };

    @action
    startLoading = () => { this.loading = true };
    @action
    stopLoading = () => { this.loading = false };

    @action
    startForceLoading = () => { this.forceLoading = true };
    @action
    stopForceLoading = () => { this.forceLoading = false };
}

export const serverDataStore = new ServerDataStore();