import { observable, action } from 'mobx';

export class SeatStore {
    @action
    init = props => {
        const { tickets, id } = props;
        // eslint-disable-next-line array-callback-return
        tickets.map(e => {
            if( id === e.uid) this.ticket = e;
        });
    };

    @observable
    specialType = false;

    @observable
    ticket = undefined;

    @observable
    hover = false;

    @observable
    click = false;

    @action
    addSpecialType = () => {
        this.specialType = true;
    };

    @action
    onEnter = () => {
        this.hover = true;
    };

    @action
    onOver = () => {
        this.hover = false;
    };

    @action
    onClick = () => {
        this.click = !this.click;
    }
}