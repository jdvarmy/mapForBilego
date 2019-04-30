export default class Tooltip {

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
                y = rect.y + errorY - this.domNode.offsetHeight - 18;

            this.domNode.setAttribute('style', `left: ${x}px; top: ${y}px`);
        }
    }
}