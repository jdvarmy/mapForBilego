import { action, observable } from 'mobx';

class CartStore{
    @observable tickets = null;
    @observable event = null;
    @observable total = null;
    city = null;

    // validate form
    @observable email = '';
    @observable emailValid = '';
    @observable formValid = false;

    constructor(props){
        const location = window.location.search;

        if( location ) {
            const urlArray = location.substr(1).split('&');
            this.city = urlArray[1].split('=')[1];
        }
    }

    @action
    addTickets = tickets => {
        this.tickets = tickets;
    };

    @action
    addEvent = event => {
        this.event = event;
    };
    @action
    addTotal = total => {
        this.total = total;
    };

    @action
    clear = () => {
        this.tickets = null;
        this.event = null;
        this.total = null;
    };

    // validate form
    @action
    setEmail = email => {
        this.email = email;
    };
    @action
    checkEmail = valid => {
        this.emailValid = valid;
    };
    @action
    checkForm = valid => {
        this.formValid = valid;
    };

}

export const cartStore = new CartStore();