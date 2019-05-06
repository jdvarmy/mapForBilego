import Tooltip from './Tooltip'

export class TooltipPath extends Tooltip{
    constructor(props){
        super(props);

        this.props = props;
    }

    create = errorY => {
        const { el, ticketArr, text } = this.props;

        this.el = el;
        let count=0, priceMin, priceMax, title;

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

        title = text;
        ticketArr.map(e=>{
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

        this.update(errorY);
    };
}