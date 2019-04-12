import {action, observable} from 'mobx'

class BasketStore{
    @observable buyingTicketsArr = [];

    @action.bound
    addToBasket(ticket){}

    @action.bound
    deleteFromBasket(){}

    @action.bound
    getBasketForm(){}

    @action.bound
    getPayForm(){}
}

const basketStore = new BasketStore();

export default basketStore;