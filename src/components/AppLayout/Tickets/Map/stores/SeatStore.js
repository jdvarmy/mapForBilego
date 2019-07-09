import { observable, action } from 'mobx';

export class SeatStore {
    @action
    init = props => {
        const { tickets, id } = props;
        // eslint-disable-next-line array-callback-return
        tickets.map(e => {
            if( id === e.uid ) this.ticket = e;
        });
    };

    @action
    initTicketCloud = props => {
        const { name, row, sector, tickets } = props;
        // eslint-disable-next-line array-callback-return
        tickets.map(e => {
            if( e.sector && e.row && e.seat ) {
                if (sector === e.sector && row === e.row.toString() && name === e.seat.toString()) {
                    this.ticket = e;
                }
            }else{
                if( name === e.id || name === e.sector ) this.ticket = e;
            }
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