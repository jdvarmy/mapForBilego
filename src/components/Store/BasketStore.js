import {action, observable} from 'mobx'

class BasketStore{
    @observable tickets = [];

    @action
    addToBasket = ticket => {
        this.tickets.push(ticket);
        console.log(this.tickets)
    };

    @action
    deleteFromBasket = () => {};

    @action
    getBasketForm = () => {};

    @action
    getPayForm = () => {};
}

const basketStore = new BasketStore();

export default basketStore;