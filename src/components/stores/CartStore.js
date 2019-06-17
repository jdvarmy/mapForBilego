import {action, observable} from 'mobx';

class CartStore{
    @observable tickets = null;

    @action
    addTickets( tickets ){
        console.log({...tickets})
        this.tickets = tickets;
    }
}

export const cartStore = new CartStore();