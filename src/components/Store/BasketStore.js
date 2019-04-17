import {action, observable} from 'mobx'

class BasketStore{
    @observable buyingTickets = [];

    @action.bound
    addToBasket(ticket){
        this.buyingTickets.push(ticket);
        console.log(this.buyingTickets)
    }

    @action.bound
    deleteFromBasket(){}

    @action.bound
    getBasketForm(){}

    @action.bound
    getPayForm(){}
}

const basketStore = new BasketStore();

export default basketStore;