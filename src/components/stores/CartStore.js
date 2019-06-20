import { action, observable } from 'mobx';

class CartStore{
    @observable tickets = null;
    @observable event = null;

    @action
    addTickets = ( tickets ) => {
        this.tickets = tickets;
    };

    @action
    addEvent = ( event ) => {
        this.event = event;
    };
}

export const cartStore = new CartStore();