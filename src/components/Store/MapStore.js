import {action, observable} from 'mobx'
// import * as Hammer from 'hammerjs';


const inverse = (x) => x * -1;


class MapStore{
    @observable x = 0;
    @observable y = 0;
    @observable scale = 1;
    @observable delay = 0;

    /**
     * map
     */

    containerW = 0;
    containerH = 0;
    contentW = 0;
    contentH = 0;

    fitscale = this.scale;
    maxscale = 4;
    zoommargin = 0;
    container = undefined;
    map = undefined;

    // touch
    init1 = null;
    init2 = null;
    initD = 0;
    initScale = null;

    // path store
    @observable pathDisplay = false;

    @action.bound
    handleClick(e){
        this.stopMomentum();
        this.delay = 400/1000;

        const scale = this.scale;
        this.scale = this.normalizeScale(scale + scale * (scale+1));

        this.x = this.normalizeX(this.x - (e.pageX - this.container.getBoundingClientRect().left - this.x) * (this.scale/scale - 1));
        this.y = this.normalizeY(this.y - (e.pageY - this.container.getBoundingClientRect().top - this.y) * (this.scale/scale - 1));

        this.scale > this.maxscale-2.5 ? this.pathDisplay = true : this.pathDisplay = false;
    }

    @action.bound
    handleMouseDown(e){
        this.map.classList.add('dragging');

        this.initial = {x: e.pageX, y: e.pageY}
        this.current = {x: this.x, y: this.y}

        this.stopMomentum();
        this.mouse.x = this.normalizeX(e.pageX - this.initial.x + this.current.x);
        this.mouse.y = this.normalizeY(e.pageY - this.initial.y + this.current.y);
        this.momentumStep();

        this.map.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    onMouseMove = e => {
        this.mouse.x = this.normalizeX(e.pageX - this.initial.x + this.current.x);
        this.mouse.y = this.normalizeY(e.pageY - this.initial.y + this.current.y);
    };
    onMouseUp = e => {
        this.map.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.map.classList.remove('dragging');
        e.preventDefault();
    };

    @action.bound
    handleWheel(e){
        this.delay = 400/1000;

        const scale = this.scale;
        this.scale = this.normalizeScale(scale + scale * inverse(e.deltaY) / 500);

        this.zoomTo(
            this.normalizeX(this.x - (e.pageX - this.container.getBoundingClientRect().left - this.x) * (this.scale/scale - 1)),
            this.normalizeY(this.y - (e.pageY - this.container.getBoundingClientRect().top - this.y) * (this.scale/scale - 1)),
            undefined,
            400
        );
        // this.x = this.normalizeX(this.x - (e.pageX - this.container.getBoundingClientRect().left - this.x) * (this.scale/scale - 1));
        // this.y = this.normalizeY(this.y - (e.pageY - this.container.getBoundingClientRect().top - this.y) * (this.scale/scale - 1));

        this.scale > this.maxscale-2.5 ? this.pathDisplay = true : this.pathDisplay = false;
    }

    @action.bound
    handleTouchStart(e){
        const orig = e.touches,
            touches = orig.length;

        if (touches === 1) {
            this.map.classList.add('dragging');

            this.stopMomentum();
            this.init1 = {
                x: orig[0].pageX - this.x,
                y: orig[0].pageY - this.y
            };

            this.mouse.x = this.normalizeX(orig[0].pageX - this.init1.x);
            this.mouse.y = this.normalizeY(orig[0].pageY - this.init1.y);
            this.momentumStep();

            this.map.addEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onTouchEnd);
        }

        if (touches === 2) {
            this.map.classList.add('dragging');

            this.stopMomentum();
            this.init1 = { x: orig[0].pageX - this.x, y: orig[0].pageY - this.y };
            this.init2 = { x: orig[1].pageX - this.x, y: orig[1].pageY - this.y };
            this.initD = Math.sqrt(Math.pow(this.init1.x - this.init2.x, 2) + Math.pow(this.init1.y - this.init2.y, 2));
            this.initScale = this.scale;

            this.map.removeEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onTouchEnd);

            this.map.addEventListener('touchmove', this.onTouchMoveZoom);
            document.addEventListener('touchend', this.onTouchEndZoom);
        }
    }
    onTouchMove = e => {
        const orig = e.touches,
            touches = orig.length;

        if (touches === 1) {
            this.mouse.x = this.normalizeX(orig[0].pageX - this.init1.x);
            this.mouse.y = this.normalizeY(orig[0].pageY - this.init1.y);
        }
    };
    onTouchEnd = e => {
        e.preventDefault();
        this.map.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        this.map.classList.remove('dragging');
    };
    onTouchMoveZoom = e => {
        e.preventDefault();

        const orig = e.touches,
            touches = orig.length;

        const pos = {
            x: (orig[0].pageX + orig[1].pageX)/2,
            y: (orig[0].pageY + orig[1].pageY)/2
        };

        const dist = Math.sqrt(Math.pow(orig.touches[0].pageX - orig.touches[1].pageX, 2) + Math.pow(orig.touches[0].pageY - orig.touches[1].pageY, 2)) / this.initD;

        var scale = this.scale;
        this.scale = this.normalizeScale(this.initScale * dist);

        this.zoomTo(
            this.normalizeX(this.x - (pos.x  - this.container.el.offset().left - this.x) * (this.scale/scale - 1)),
            this.normalizeY(this.y - (pos.y - this.container.el.offset().top - this.y) * (this.scale/scale - 1))
        );
    };
    onTouchEndZoom = e => {
        e.preventDefault();
        this.map.removeEventListener('touchmove', this.onTouchMoveZoom);
        document.removeEventListener('touchend', this.onTouchEndZoom);
        this.map.classList.remove('dragging');
    };

    //
    momentum = null;
    current = {x: 0, y: 0};
    position = {x: 0, y: 0};
    friction = 0.85;
    mouse = {x: 0, y: 0};
    previous = {x: this.position.x, y: this.position.y};
    velocity = {x: 0, y: 0};
    initial = {x: 0, y: 0};
    stopMomentum = () => {
        cancelAnimationFrame(this.momentum);
        if (this.momentum != null) {
            this.x = this.position.x;
            this.y = this.position.y;
        }
        this.momentum = null;
    };
    momentumStep = () => {
        this.momentum = requestAnimationFrame(this.momentumStep);

        if ( this.map.classList.contains('dragging') ) {
            this.previous.x = this.position.x;
            this.previous.y = this.position.y;

            this.position.x = this.mouse.x;
            this.position.y = this.mouse.y;

            this.velocity.x = (this.position.x - this.previous.x);
            this.velocity.y = (this.position.y - this.previous.y);
        }
        else {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;

            if (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) < 0.1) {
                this.stopMomentum();
                this.x = this.position.x;
                this.y = this.position.y;
            }
        }
        this.position.x = this.normalizeX(this.position.x);
        this.position.y = this.normalizeY(this.position.y);

        this.zoomTo(this.position.x, this.position.y);
    };

    //
    resetZoom = () => {
        this.moveTo(0.5, 0.5, this.fitscale, 0);
    };
    moveTo = (x, y, s, duration, ry) => {
        duration = typeof duration !== 'undefined' ? duration : 400;
        ry = typeof ry !== 'undefined' ? ry : 0.5;
        s = typeof s !== 'undefined' ? s : this.scale/this.fitscale;

        this.scale = this.normalizeScale(s);

        this.zoomTo(
            this.normalizeX(this.containerW * 0.5 - this.scale * this.contentW * x),
            this.normalizeY(this.containerH * ry - this.scale * this.contentH * y)
        );
    };
    zoomTo = (x, y, scale, d) => {
        if( typeof scale !== 'undefined' ) this.scale = scale;
        d = typeof d !== 'undefined' ? d/1000 : 0;

        this.delay = d;
        this.x = x;
        this.y = y;

        if(this.containerMinimap !== undefined) {
            this.updateMinimap();
        }
    };

    //
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


    /**
     * minimap
     */

    containerMinimap = undefined;
    @observable miniMap = {top: 0, left: 0, right: 0, bottom: 0};

    updateMinimap = () => {
        const width = (this.containerW / this.contentW / this.scale * this.containerMinimap.offsetWidth),
            height = (this.containerH / this.contentH / this.scale * this.containerMinimap.offsetHeight);

            this.miniMap.top = (-this.y / this.contentH / this.scale * this.containerMinimap.offsetWidth);
            this.miniMap.left = (-this.x / this.contentW / this.scale * this.containerMinimap.offsetHeight);
            this.miniMap.right = this.miniMap.left + width;
            this.miniMap.bottom = this.miniMap.top + height;

            // console.log(width, height)
            // console.log({...this.miniMap})
            console.log(this.containerH)
            console.log(this.contentH)
            console.log(this.scale)
            console.log(this.containerMinimap.offsetHeight)
    };

}

const mapStore = new MapStore();

export default mapStore;
