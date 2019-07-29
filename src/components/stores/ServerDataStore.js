import { observable, action } from 'mobx';

import { getData, getCheckout } from '../../data/fetch';

class ServerDataStore{
    @observable data = null;
    @observable checkoutData = null;

    @observable loading = true;
    @observable loadingImage = 1;

    @observable error = false;

    @action
    getPostData = () => {
        this.startLoading();
        getData().then(data => {
            console.log(data)

            if( data ) {
                if ( !data.code) {
                    this.data = data;
                    this.stopLoading();
                }
            }
        });

        this.checkoutData = null;
    };

    @action
    getCheckoutData = (data) => {
        console.log('load')

        getCheckout(data).then( data => {
            console.log(data)

            if( data ) {
                if( data.code === 'error' ){
                    this.setError(data.message);
                }else{
                    this.checkoutData = data;
                    setTimeout(() => {
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

        this.loading = false;

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
}

export const serverDataStore = new ServerDataStore();