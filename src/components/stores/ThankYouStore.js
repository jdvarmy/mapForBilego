import {action, observable} from 'mobx';

class ThankYouStore{
    @observable thankYou = false;

    @action
    setThankYou = ( flag ) => {
        this.thankYou = flag;
    };
}

export const thankYouStore = new ThankYouStore();