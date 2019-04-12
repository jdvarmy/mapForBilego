// import React from "react"
// import ReactDOM from "react-dom"
// import { observer } from "mobx-react"
// import { observable, action, $mobx } from "mobx"
import mapStore from '../Store/MapStore'


class Tooltip {

    constructor(){
        const id = 'bt-tooltip';
        this.domNode = document.querySelector(`#${id}`);

        if( !this.domNode ) {
            this.domNode = document.createElement('div');
            this.domNode.setAttribute('id', id);
            document.body.appendChild(this.domNode);
        }
    }

    create = ( el, tickets, text ) => {
        // console.log(mapStore.scale)
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

        if( el.nodeName === 'path' ){
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
        }else if( el.nodeName === 'circle' ){
            title = `${tickets.price_regular} ₽`;
            const c = `${tickets.sector_name}`;
            const d = `ряд ${tickets.row_name} место ${tickets.seat_name}`;

            wrap.classList.add('bt-tooltip-wrap-seat');
            titl.appendChild( document.createTextNode(title) );
            cont.appendChild( document.createTextNode(c) );
            desc.appendChild( document.createTextNode(d) );
        }

        const rect = el.getBoundingClientRect();
        let x = rect.x - this.domNode.offsetWidth * 0.5 + rect.width * 0.5,
            y = rect.y - this.domNode.offsetHeight - 18 - 2*mapStore.scale;

        this.domNode.setAttribute('style', `left: ${x}px; top: ${y}px`);

        // React.createElement (
        //     <div className="bt-tooltip-wrap">
        //         <div className="bt-tooltip-title">title</div>
        //         <div className="bt-tooltip-content">content</div>
        //         <div className="bt-tooltip-descr">descr</div>
        //     </div>,
        //     this.domNode
        // )
    };
    delete = () => {
        if( this.domNode.firstChild )
            this.domNode.firstChild.remove();
    };

    // render(){
    //     return this.props.children
    //     // return [this.props.children, this.create(), this.delete()]
    // }
}

export default new Tooltip();