import { observable, action } from 'mobx';
import { getData, getCheckout } from '../../data/fetch';

class ServerDataStore{
    @observable isLoading = false;
    @observable data = null;
    @observable checkoutData = null;
    @observable loading = true;
    @observable loadingImage = 1;

    @observable error = false;

    @action
    getPostData = () => {
        this.startLoading();
        getData().then(data => {
            if( data ) {
                if( data.code === 'error' ){
                    this.setError(data.message);
                }else{
                    if(data.ticket_type === 'map' && (data.map_data === '' || data.map_images.length === 0)){
                        this.setError('Ошибка при загрузке карты!');
                    }else {
                        this.data = data;
                    }
                }
                this.stopLoading();
            }
        });

        this.checkoutData = null;
    };

    @action
    getCheckoutData = (data) => {
        this.isLoading = true;
        getCheckout(data).then( data => {
            console.log(data)
            if( data ) {
                if( data.code === 'error' ){
                    this.isLoading = false;
                    this.setError(data.message);
                }else{
                    this.isLoading = false;
                    this.checkoutData = data;
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
