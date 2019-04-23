import {action, observable} from 'mobx'

class BasketStore{
    @observable tickets = new Map();
    @observable count = 0;
    @observable productInBasket = false;

    @action
    toBasket = (ticket, action) => {
        if(!ticket.ID) return null;

        if( action ) {
            const {ID, UID, name, price_regular, row_name, seat_name, sector_name, color} = ticket;
            this.tickets.set(ticket.ID, {id: ID, uid: UID, name: name, price: price_regular, row: row_name, seat: seat_name, sector: sector_name, color: color, count: 1});
            this.count++;
        }else{
            this.tickets.delete(ticket.ID);
            this.count--;
        }

        this.productInBasket = this.count > 0;
    };

    // work with @set@ tickets
    @observable
    setWindowMode = false;
    @observable
    currentTicketsSet = [];

    @action
    setSetWindowMode = (val, ticketSet) => {
        this.setWindowMode = val;
        this.currentTicketsSet = ticketSet;
    };
}

const basketStore = new BasketStore();

export default basketStore;