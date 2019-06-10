import { observable, action } from 'mobx';

export class PathStore {
    @action
    init = props => {
        const { tickets, id } = props;
        tickets.map(e => {
            if( id === e.uid) this.ticket = e
        });
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