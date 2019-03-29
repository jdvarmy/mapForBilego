import { observable, action } from 'mobx'
import { getData } from '../../data/fetch'

class ServerStore{
    @observable data = null;

    @action.bound
    getPostData(){
        getData().then((data) => {
            this.data = data
        })
    }
}

const serverStore = new ServerStore();
serverStore.getPostData();

export default serverStore;