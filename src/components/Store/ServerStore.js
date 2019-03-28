import { observable, action } from 'mobx'
import { getData } from '../../data/fetch'

export class ServerStore{
    @observable data = null;

    @action.bound
    getPostData(){
        getData().then((data) => {
            this.data = data
        })
    }
}