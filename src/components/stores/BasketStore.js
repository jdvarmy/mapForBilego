import { action, observable } from 'mobx'

class BasketStore{
    @observable tickets = [];
    @observable ticketsMap = new Map();
    @observable count = 0;
    @observable productInBasket = false;
    @observable isFull = false;

    seatStores = {};

    maxCountInBasket = 6;

    @action
    toBasket = (ticket, action, store) => {
        if( !ticket ) return false;
        if( !ticket.id ) return false;
        const {id, price_regular, row_name, seat_name, sector_name, name, type} = ticket;
        let oldTicket, newTicket = {id: id, name: name, price: price_regular, row: row_name, seat: seat_name, sector: sector_name, count: 1, type: type};

        if( action && this.isFull ) return false;
        if( action && this.ticketsMap.get(id) && ticket.stock < this.ticketsMap.get(id).count+1 ) return false;

        /*ticketsMap*/
        if(action){
            if( this.ticketsMap.has(id) ){
                oldTicket = this.ticketsMap.get(id);
                oldTicket.count++;
                this.ticketsMap.set(id, oldTicket);
            }else{
                this.ticketsMap.set(id, newTicket);
            }
        }else{
            if( this.ticketsMap.has(id) ){
                oldTicket = this.ticketsMap.get(id);
                if( oldTicket.count > 1 ){
                    oldTicket.count--;
                    this.ticketsMap.set(id, oldTicket);
                }else{
                    this.ticketsMap.delete(id)
                }
            }
        }
        /*tickets*/
        if(action){
            this.tickets.push({id: id, name: name, price: price_regular, row: row_name, seat: seat_name, sector: sector_name, type: type});

            if(store) this.seatStores[ticket.id] = store;
        }else{
            for(let i = this.tickets.length; i--;){
                if(this.tickets[i].id===id){
                    this.tickets.splice(i, 1);
                    break;
                }
            }
        }

        this.updateCount();

        this.productInBasket = this.count > 0;
        this.isFull = this.count+1 > this.maxCountInBasket;
    };

    // work with @set@ tickets
    @observable
    blockTicketsForm = false;
    @observable
    currentTicketsSet = null;

    @action
    updateCount = () => {
        this.count = this.tickets.length;
    };

    @action
    blockingForm = (val) => {
        this.blockTicketsForm = val;
    };

    @action
    setSetWindowMode = (val, currentTicketSet) => {
        this.blockingForm(val);
        this.currentTicketsSet = currentTicketSet;
    };

}

export const basketStore = new BasketStore();