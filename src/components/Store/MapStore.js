import {action, observable} from 'mobx'
import * as Hammer from 'hammerjs';

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));


var normalizeX = function(x, scale, containerW, contentW){
    var minX = containerW - contentW * scale;
    if (minX < 0) {
        if (x > 0) return 0;
        else if (x < minX) return minX;
    }
    else return minX/2;
};
var normalizeY = function(y, scale, containerH, contentH){
    var minY = containerH - contentH * scale;
    if (minY < 0) {
        if (y >= 0) return 0;
        else if (y < minY) return minY;
    }
    else return minY/2;
};


export class MapStore{
    @observable x = 0;
    @observable y = 0;
    @observable scale = 1;
    @observable width = 0;
    @observable height = 0;
    @observable centerX = 50;
    @observable centerY = 50;
    @observable offsetX = 0;
    @observable offsetY = 0;

    containerW = 0;
    containerH = 0;
    contentW = 0;
    contentH = 0;


    @action.bound
    handleClick(event){
        console.log(this)


    }





}

const mapStore = new MapStore();

export default mapStore;
