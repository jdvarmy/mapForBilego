import {action, observable} from 'mobx'

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
        /*map*/
        if(action) {
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


        // if( ticket.stock < count || ( this.isFull && action ) ) return false;

        if(action){
            this.tickets.push({id: ID, price: price_regular, row: row_name, seat: seat_name, sector: sector_name})
        }else{
            this.tickets.filter(v=>{
                if(v.id===ID){
                    console.log(v)
                    // break;
                }
            });
        }

        // this.updateCount();

        this.productInBasket = this.count > 0;
        console.log(this.tickets)
        console.log(this.ticketsMap)
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

export const basketStore = new BasketStore();