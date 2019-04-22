export const createSeatUID = (x, y) => {
    x = String( parseInt( Number(x) ) );
    y = String( parseInt( Number(y) ) );

    let result = '', str = x + y;
    const arr = ['A','B','C','D','E','F','G','H','I','J'];

    for(let i=str.length; i--;){
        arr.map((v,k)=>{
            if( isNaN(+str[i]) ) return;
            if( parseInt(str[i]) === k ) result += v;
        });

        if( isNaN(+str[i]) ) result += str[i];
    }
    return result;
};

export const getStrEnding = function(number, endings){
    let buffy, i;
    number = number % 100;
    if (number>=11 && number<=19)
        buffy=endings[2];
    else{
        i = number % 10;
        switch(i){
            case (1): buffy = endings[0]; break;
            case (2):
            case (3):
            case (4): buffy = endings[1]; break;
            default: buffy = endings[2];
        }
    }
    return buffy;
};

export const moneyFormating = function(string, simbol){
    let int = string + '';
    int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    if( simbol ) int = int + ' ₽';

    return int;
};

const createid = () => {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export const shadow = (dx, dy, blur, color, opacity) => {
    const defs = document.querySelector('defs');
    const id = createid();

    if (opacity == null) {
        if (color == null) {
            opacity = blur;
            blur = 4;
            color = "#000";
        } else {
            opacity = color;
            color = blur;
            blur = 4;
        }
    }
    if (blur == null) {
        blur = 4;
    }
    if (opacity == null) {
        opacity = 1;
    }
    if (dx == null) {
        dx = 0;
        dy = 2;
    }
    if (dy == null) {
        dy = dx;
    }

    // const filter = document.createElement('filter');
    // const feGaussianBlur = document.createElement('feGaussianBlur');
    // const feOffset = document.createElement('feOffset');
    // const feFlood = document.createElement('feFlood');
    // const feComposite = document.createElement('feComposite');
    // const feComponentTransfer = document.createElement('feComponentTransfer');
    // const feFuncA = document.createElement('feFuncA');
    // const feMerge = document.createElement('feMerge');
    // const feMergeNode_1 = document.createElement('feMergeNode');
    // const feMergeNode_2 = document.createElement('feMergeNode');
    //
    // filter.setAttribute('filterUnits', 'userSpaceOnUse');
    // filter.setAttribute('id', id);
    // feGaussianBlur.setAttribute('in', 'SourceAlpha');
    // feGaussianBlur.setAttribute('stdDeviation', blur);
    // feOffset.setAttribute('dx', dx);
    // feOffset.setAttribute('dy', dy);
    // feOffset.setAttribute('result', 'offsetblur');
    // feFlood.setAttribute('flood-color', color);
    // feComposite.setAttribute('in2', 'offsetblur');
    // feComposite.setAttribute('operator', 'in');
    // feFuncA.setAttribute('type', 'linear');
    // feFuncA.setAttribute('slope', opacity);
    // feMergeNode_2.setAttribute('in', 'SourceGraphic');
    //
    // defs.appendChild(filter);
    // filter.appendChild(feGaussianBlur);
    // filter.appendChild(feOffset);
    // filter.appendChild(feFlood);
    // filter.appendChild(feComposite);
    // filter.appendChild(feComponentTransfer);
    // feComponentTransfer.appendChild(feFuncA);
    // filter.appendChild(feMerge);
    // feMerge.appendChild(feMergeNode_1);
    // feMerge.appendChild(feMergeNode_2);

    const filter = document.createElementNS(null, 'filter');
    const feDropShadow = document.createElementNS(null, 'feDropShadow');

    filter.setAttribute('id', id);
    filter.setAttribute('x', 0);
    filter.setAttribute('y', 0);
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    feDropShadow.setAttributeNS(null,'dx', '0');
    feDropShadow.setAttributeNS(null,'dy', '10');
    feDropShadow.setAttributeNS(null,'stdDeviation', blur);
    feDropShadow.setAttributeNS(null,'flood-color', color);
    feDropShadow.setAttributeNS(null,'flood-opacity', opacity);

    defs.appendChild(filter);
    filter.appendChild(feDropShadow);

    return id;
};