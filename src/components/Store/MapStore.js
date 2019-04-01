import {action, observable} from 'mobx'
import * as Hammer from 'hammerjs';

const zoomTo = function(x, y, scale, d) {

    // self.map.css({
    //     'transition': 'transform ' + d + 's',
    //     'transform': 'translate(' + x.toFixed(3) + 'px ,' + y.toFixed(3) + 'px) scale(' + self.scale.toFixed(3) + ')'
    // });

    // if (scale) {
    //     $('.mapplic-pin', self.map).css({
    //         'transition': 'opacity 0.2s, transform ' + d + 's',
    //         'transform': 'scale(' + 1/self.scale + ') translateZ(0)' /*translateZ(0)*/
    //     });
    //
    //     $('.mapplic-tooltip', self.map).css({
    //         'transition': 'transform ' + 0.3 + 's',
    //         'transform': 'scale(' + 1/self.scale + ') translate(-50%, -100%) translateZ(0)' /*translateZ(0)*/
    //     });
    // }
    // if (self.minimap) self.minimap.update(x, y);

}
const inverse = (x) => x * -1;


class MapStore{
    @observable x = 0;
    @observable y = 0;
    @observable scale = 1;

    containerW = 0;
    containerH = 0;
    contentW = 0;
    contentH = 0;

    fitscale = this.scale;
    maxscale = 4;
    zoommargin = 0;
    container = undefined;

    position = {x: 0, y: 0};

    @action.bound
    handleClick(e){
        console.log(this)

    }

    @action.bound
    handleWheel(e){
        const delta = -e.deltaY;
        console.log(e)
        console.log(e.clientX)
        console.log(e.deltaX)
        console.log(e.pageX)

        this.scale = this.normalizeScale( this.scale + delta/500 )

    }


    normalizeX = (x) => {
        let minX = (this.containerW - this.contentW * this.scale).toFixed(3);
        if (minX < 0) {
            if (x > this.zoommargin) x = this.zoommargin;
            else if (x < minX - this.zoommargin) x = minX - this.zoommargin;
        }
        else x = minX/2;

        return x.toFixed(3);
    };
    normalizeY = (y) => {
        let minY = (this.containerH - this.contentH * this.scale).toFixed(3);
        if (minY < 0) {
            if (y > this.zoommargin) y = this.zoommargin;
            else if (y < minY - this.zoommargin) y = minY - this.zoommargin;
        }
        else y = minY/2;

        return y.toFixed(3);
    };
    normalizeScale = (scale) => {
        if (scale <= this.fitscale) scale = this.fitscale;
        else if (scale > this.maxscale) scale = this.maxscale;

        return scale;
    };
}

const mapStore = new MapStore();

export default mapStore;
