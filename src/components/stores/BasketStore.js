import { action, observable } from 'mobx'

class BasketStore{
    @observable tickets = [];
    @observable ticketsMap = new Map();
    @observable count = 0;
    @observable productInBasket = false;
    @observable isFull = false;

    maxCountInBasket = 6;

    @action
    toBasket = (ticket, action) => {
        if( !ticket.ID ) return false;
        const {ID, price_regular, row_name, seat_name, sector_name} = ticket;
        let oldTicket, newTicket = {id: ID, price: price_regular, row:row_name, seat: seat_name, sector: sector_name, count: 1};

        if( this.isFull && action ) return false;
        // if( ticket.stock < count ) return false;

        /*ticketsMap*/
        if(action){
            if( this.ticketsMap.has(ID) ){
                oldTicket = this.ticketsMap.get(ID);
                oldTicket.count++;
                this.ticketsMap.set(ID, oldTicket);
            }else{
                this.ticketsMap.set(ID, newTicket);
            }
        }else{
            if( this.ticketsMap.has(ID) ){
                oldTicket = this.ticketsMap.get(ID);
                if( oldTicket.count > 1 ){
                    oldTicket.count--;
                    this.ticketsMap.set(ID, oldTicket);
                }else{
                    this.ticketsMap.delete(ID)
                }
            }
        }
        /*tickets*/
        if(action){
            this.tickets.push({id: ID, price: price_regular, row: row_name, seat: seat_name, sector: sector_name})
        }else{
            for(let i = this.tickets.length; i--;){
                if(this.tickets[i].id===ID){
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
    setWindowMode = false;
    @observable
    currentTicketsSet = [];

    @action
    updateCount = () => {
        this.count = this.tickets.length;
    };

    @action
    setSetWindowMode = (val, currentTicketSet) => {
        this.setWindowMode = val;
        this.currentTicketsSet = currentTicketSet;
    };
}

export const basketStore = new BasketStore();