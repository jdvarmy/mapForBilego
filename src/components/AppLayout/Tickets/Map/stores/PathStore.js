import { observable, action } from 'mobx';

export class PathStore {
    ticket = [];

    @action
    init = props => {
        const { tickets, id } = props;
        if( tickets !== null ) {
            // eslint-disable-next-line array-callback-return
            tickets.map(e => {
                if (id === e.uid){ this.ticket.push(e); }
            });
        }
    };

    @observable
    hover = false;

    @observable
    click = false;

    @action
    onEnter = () => {
        this.hover = true;
    };

    @action
    onOver = () => {
        this.hover = false;
    };
}