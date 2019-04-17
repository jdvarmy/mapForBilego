// import React from "react"
// import ReactDOM from "react-dom"
// import { observer } from "mobx-react"
// import { observable, action, $mobx } from "mobx"
import mapStore from '../Store/MapStore'


class Tooltip {

    constructor(){
        const id = 'bt-tooltip';
        this.domNode = document.querySelector(`#${id}`);
        this.el = undefined;

        if( !this.domNode ) {
            this.domNode = document.createElement('div');
            this.domNode.setAttribute('id', id);
            document.body.appendChild(this.domNode);
        }
    }

    create = ( el, tickets, text ) => {
        this.el = el;
        let count=0, priceMin, priceMax, title, content, descr;

        const wrap = document.createElement('div'),
            titl = document.createElement('div'),
            cont = document.createElement('div'),
            desc = document.createElement('div');

        this.domNode.appendChild(wrap);
        wrap.appendChild(titl);
        wrap.appendChild(cont);
        wrap.appendChild(desc);

        wrap.classList.add('bt-tooltip-wrap');
        titl.classList.add('title');
        cont.classList.add('content');
        desc.classList.add('descr');

        if( this.el.nodeName === 'path' ){
            title = text;
            tickets.map(e=>{
                count += e.stock;
                if( priceMin === undefined ) priceMin = e.price_regular;
                if( priceMax === undefined ) priceMax = e.price_regular;
                if( priceMin > e.price_regular ) priceMin = e.price_regular;
                if( priceMax < e.price_regular ) priceMax = e.price_regular;
            });

            wrap.classList.add('bt-tooltip-wrap-sector');

            titl.appendChild( document.createTextNode(title) );
            if( count > 0 ) {
                if (priceMin === priceMax) cont.appendChild(document.createTextNode(`${priceMin} ₽`));
                else cont.appendChild(document.createTextNode(`${priceMin} - ${priceMax} ₽`));
                desc.appendChild(document.createTextNode(`Свободных мест ${count}`));
            }else desc.appendChild(document.createTextNode(`Свободных мест нет`));
        }else if( this.el.nodeName === 'circle' || this.el.nodeName === 'g' ){
            title = `${tickets.price_regular} ₽`;
            const c = `${tickets.sector_name}`;
            const d = `ряд ${tickets.row_name} место ${tickets.seat_name}`;

            wrap.classList.add('bt-tooltip-wrap-seat');
            titl.appendChild( document.createTextNode(title) );
            cont.appendChild( document.createTextNode(c) );
            desc.appendChild( document.createTextNode(d) );
        }

        this.update();
    };
    delete = () => {
        if( this.domNode.firstChild )
            this.domNode.firstChild.remove();

        this.el = undefined;
    };
    update = (errorY) => {
        errorY = typeof errorY === 'undefined' ? 0 : errorY;

        if( this.el !== undefined ) {
            const rect = this.el.getBoundingClientRect();
            let x = rect.x - this.domNode.offsetWidth * 0.5 + rect.width * 0.5,
                y = rect.y + errorY - this.domNode.offsetHeight - 18 - 2 * mapStore.scale;

            this.domNode.setAttribute('style', `left: ${x}px; top: ${y}px`);
        }
    }
}

export const tooltip = new Tooltip();