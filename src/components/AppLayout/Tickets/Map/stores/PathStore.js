import { observable, action } from 'mobx';

export class PathStore {
    @action
    init = props => {
        const { tickets, id } = props;
        if( tickets !== null ) {
            // eslint-disable-next-line array-callback-return
            tickets.map(e => {
                if (id === e.uid) this.ticket = e
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