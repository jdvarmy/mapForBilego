import { observable, action } from 'mobx'
import { getData } from '../../data/fetch'

class ServerDataStore{
    @observable data = null;

    @action
    getPostData = () => {
        getData().then((data) => {
            this.data = data;
        })
    }
}

export const serverDataStore = new ServerDataStore();