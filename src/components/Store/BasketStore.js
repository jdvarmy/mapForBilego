import {action, observable, computed} from 'mobx'

class BasketStore{
    @observable tickets = new Map();
    @observable count = 0;
    @observable productInBasket = false;

    @action
    toBasket = (ticket, action) => {
        if(!ticket.ID) return null;

        if( action ) {
            this.tickets.set(ticket.ID, ticket);
            this.count++;
        }else{
            this.tickets.delete(ticket.ID);
            this.count--;
        }

        this.productInBasket = this.count > 0;
    };


    // @computed
    // get getBasketForm(){return null};
    //
    // @computed
    // get getPayForm(){return null};
}

const basketStore = new BasketStore();

export default basketStore;