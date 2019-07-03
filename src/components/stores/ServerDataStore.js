import { observable, action } from 'mobx';

import { getData, getCheckout } from '../../data/fetch';

class ServerDataStore{
    @observable data = null;
    @observable checkoutData = null;

    @observable loading = true;
    @observable forceLoading = false;

    @observable error = false;

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

            if( data ) {
                if( data.code === 'checkout-error' ){
                    this.setError(data.message);
                }else {
                    this.checkoutData = data;
                    setTimeout(() => {
                        this.stopForceLoading()
                    }, 3500);
                }
            }

        });
    };

    @action
    clean = () => {
        this.data = null;
        this.checkoutData = null;
        this.error = false;

        this.forceLoading = false;

        this.getPostData();
    };

    @action
    setError = error => {
        this.error = error;
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