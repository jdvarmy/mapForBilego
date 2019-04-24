import {action, observable} from 'mobx'

class BasketStore{
    @observable tickets = new Map();
    @observable count = 0;
    @observable productInBasket = false;
    maxCount = 6;

    @action
    toBasket = (ticket, action) => {
        if( !ticket.ID ) return false;

        const tickets = this.tickets;

        let count = 0;
        if(action) count = tickets.has(ticket.ID) ? tickets.get(ticket.ID).count + 1 : 1;
        else count = tickets.has(ticket.ID) ? tickets.get(ticket.ID).count - 1 : 0;

        if( this.count+1 > this.maxCount || ticket.stock < count) return false;

        const {ID, UID, name, price_regular, row_name, seat_name, sector_name, color} = ticket;

        if(tickets.has(ticket.ID)) tickets.delete(ticket.ID);
        if(count > 0)
            tickets.set(ticket.ID, {id: ID, uid: UID, name: name, price: price_regular, row: row_name, seat: seat_name, sector: sector_name, color: color, count: count});

        this.updateCount();
        this.productInBasket = this.count > 0;
    };

    @action
    updateCount = () => {
        let c = 0;
        this.tickets.forEach(
            el => {
                c += parseInt( el.count );
            }
        );
        this.count = c > this.maxCount ? this.maxCount : c;
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