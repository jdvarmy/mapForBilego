import { observable } from 'mobx'

export class MapStore{
    @observable states = {
        x: 0,
        y: 0,
        scale: 1,
        maxscale: 4,
        width: 0,
        heigth: 0,
        defaultWidth: 0,
        defaultHeight: 0,
    };
}