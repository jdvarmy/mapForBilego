import {action, observable} from 'mobx';

class InformerStore{
    @observable message = '';

    @action
    setMessage = ( msg ) => {
        this.message = msg;
    }
}

export const informerStore = new InformerStore();