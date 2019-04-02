import {action, observable} from 'mobx'
import * as Hammer from 'hammerjs';


const inverse = (x) => x * -1;


class MapStore{
    @observable x = 0;
    @observable y = 0;
    @observable scale = 1;
    @observable delay = 0;

    containerW = 0;
    containerH = 0;
    contentW = 0;
    contentH = 0;

    fitscale = this.scale;
    maxscale = 4;
    zoommargin = 0;
    container = undefined;

    // path store
    @observable pathDisplay = false;

    @action.bound
    handleClick(e){
        // this.stopMomentum();
        this.delay = 400/1000;

        const scale = this.scale;
        this.scale = this.normalizeScale(scale + scale * (scale+1));

        this.x = this.normalizeX(this.x - (e.pageX - this.container.getBoundingClientRect().left - this.x) * (this.scale/scale - 1));
        this.y = this.normalizeY(this.y - (e.pageY - this.container.getBoundingClientRect().top - this.y) * (this.scale/scale - 1));

        this.scale > this.maxscale-2.5 ? this.pathDisplay = true : this.pathDisplay = false;
    }

    // handleMouseDown(e){
    //     console.log(e)
    //     this.dragging = false;
    //     this.map.addClass('mapplic-dragging');
    //
    //     var initial = {x: e.pageX, y: e.pageY};
    //
    //     // this.stopMomentum();
    //     this.mouse.x = this.normalizeX(e.pageX - initial.x + this.x);
    //     this.mouse.y = this.normalizeY(e.pageY - initial.y + this.y);
    //     this.momentumStep();
    //
    //     this.map.on('mousemove', function(e) {
    //         this.dragging = true;
    //
    //         mouse.x = normalizeX(e.pageX - initial.x + this.x);
    //         mouse.y = normalizeY(e.pageY - initial.y + this.y);
    //     });
    //
    //     $(document).on('mouseup', function() {
    //         this.map.off('mousemove');
    //         $(document).off('mouseup');
    //
    //         this.map.removeClass('mapplic-dragging');
    //     });
    // }
    //
    // // momentum
    // friction = 0.85;
    // mouse = {x: 0, y: 0};
    // previous = {x: this.position.x, y: this.position.y};
    // velocity = {x: 0, y: 0};
    //
    // momentumStep() {
    //     this.momentum = requestAnimationFrame(momentumStep);
    //
    //     if (this.map.hasClass('mapplic-dragging')) {
    //         this.previous.x = this.position.x;
    //         this.previous.y = this.position.y;
    //
    //         this.position.x = this.mouse.x;
    //         this.position.y = this.mouse.y;
    //
    //         this.velocity.x = (this.position.x - this.previous.x);
    //         this.velocity.y = (this.position.y - this.previous.y);
    //     }
    //     else {
    //         this.position.x += this.velocity.x;
    //         this.position.y += this.velocity.y;
    //
    //         this.velocity.x *= this.friction;
    //         this.velocity.y *= this.friction;
    //
    //         if (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) < 0.1) {
    //             this.stopMomentum();
    //             this.x = this.position.x;
    //             this.y = this.position.y;
    //         }
    //     }
    //     this.position.x = this.normalizeX(this.position.x);
    //     this.position.y = this.normalizeY(this.position.y);
    //
    //     // zoomTo(this.position.x, this.position.y);
    // }
    //
    // stopMomentum() {
    //     cancelAnimationFrame(this.momentum);
    //     if (this.momentum != null) {
    //         this.x = this.position.x;
    //         this.y = this.position.y;
    //     }
    //     this.momentum = null;
    // }
    





    @action.bound
    handleWheel(e){
        this.delay = 400/1000;

        const scale = this.scale;
        this.scale = this.normalizeScale(scale + scale * inverse(e.deltaY) / 500);

        this.x = this.normalizeX(this.x - (e.pageX - this.container.getBoundingClientRect().left - this.x) * (this.scale/scale - 1));
        this.y = this.normalizeY(this.y - (e.pageY - this.container.getBoundingClientRect().top - this.y) * (this.scale/scale - 1));

        this.scale > this.maxscale-2.5 ? this.pathDisplay = true : this.pathDisplay = false;
    }


    // hammer js
    // /**
    //  * Lock in the focal point of the zoom
    //  */
    // @action.bound
    // handleZoomStart(e) {
    //     console.log('handleZoomStart')
    // }
    //
    // /**
    //  * Determine the zoom value to apply
    //  */
    // @action.bound
    // handleZoom(e) {
    //     console.log('handleZoom')
    // }
    //
    // /**
    //  * Determine the pan value to apply
    //  */
    // @action.bound
    // handlePan(e) {
    //     console.log('handlePan')
    // }
    //
    // /**
    //  * Process the pan and zoom
    //  */
    // @action.bound
    // handleSave() {
    //     console.log('handleSave')
    // }
    //
    // /**
    //  * Reset on double tap
    //  */
    // @action.bound
    // handleReset() {
    //     console.log('handleReset')
    // }






    resetZoom = () => {
        this.moveTo(0.5, 0.5, this.fitscale, 0);
    };
    moveTo = (x, y, s, duration, ry) => {
        duration = typeof duration !== 'undefined' ? duration : 400;
        ry = typeof ry !== 'undefined' ? ry : 0.5;
        s = typeof s !== 'undefined' ? s : this.scale/this.fitscale;

        this.delay = duration;
        this.scale = this.normalizeScale(s);
        this.x = this.normalizeX(this.containerW * 0.5 - this.scale * this.contentW * x);
        this.y = this.normalizeY(this.containerH * ry - this.scale * this.contentH * y);
    };


    normalizeX = (x) => {
        let minX = (this.containerW - this.contentW * this.scale);
        if (minX < 0) {
            if (x > this.zoommargin) x = this.zoommargin;
            else if (x < minX - this.zoommargin) x = minX - this.zoommargin;
        }
        else x = minX/2;

        return x;
    };
    normalizeY = (y) => {
        let minY = (this.containerH - this.contentH * this.scale);
        if (minY < 0) {
            if (y > this.zoommargin) y = this.zoommargin;
            else if (y < minY - this.zoommargin) y = minY - this.zoommargin;
        }
        else y = minY/2;

        return y;
    };
    normalizeScale = (scale) => {
        if (scale <= this.fitscale) scale = this.fitscale;
        else if (scale > this.maxscale) scale = this.maxscale;

        return scale;
    };
}

const mapStore = new MapStore();

export default mapStore;
