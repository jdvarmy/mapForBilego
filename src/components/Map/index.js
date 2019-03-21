import React from 'react';
import Menu from './Menu'
import Minimap from './../Minimap'
// import PinchToZoom from 'react-pinch-and-zoom';

const zoomTo = (domEl, x, y, w, h, scale, d, easing) => {
    if (scale !== undefined) {
        domEl.stop().animate({
            'left': x,
            'top': y,
            'width': w * scale,
            'height': h * scale
        }, d, easing);
    }else {
        domEl.css({
            'left': x,
            'top': y
        });
    }
};

class Map extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            container: {
                width: parseInt(this.props.data.map_data.data.width),
                height: parseInt(this.props.data.map_data.data.height),
                top: 0,
                left: 0,
            },
            dimensions: {
                x: 0,
                y: 0,
                scale: 1,
                fitscale: 0,
                maxscale: 5,
            }
        }
    }

    componentDidMount(): void {
        window.addEventListener("resize", this.dimensions);
    }

    dimensions = () =>{
        let w = window.innerWidth,
            h = window.innerHeight;

        let wr = t.container.el.width() / this.state.container.width,
            hr = t.container.el.height() / this.state.container.height;

        // if (wr < hr) t.options.fitscale = wr;
        // else t.options.fitscale = hr;
        //
        // if (t.container.oldW != t.container.el.width() || t.container.oldH != t.container.el.height()) {
        //
        //     t.container.oldW = t.container.el.width();
        //     t.container.oldH = t.container.el.height();
        //
        //     t.container.resetZoom();
        // }
    }

    render(){
        const data = this.props.data;

        const createSvg = () => {
            const background = data.map_images.bgmap[1];
            return(
                <svg id="bts-tickets-map" {...data.map_data.data} style={{backgroundImage: "url(" + background + ")"}} >

                </svg>
            );
        };

        return(
            <>
                <Menu />
                <div id="bt--tickets-views" data-type={data.type} className="bt-map">
                    <div className="bt-container map">
                        <div className="btm-map btm-zoomable" style={{
                            width: this.state.container.width,
                            height: this.state.container.height,
                            top: this.state.container.top,
                            left: this.state.container.left
                        }}>
                            <div className="btm-map-image">
                                {createSvg()}
                            </div>
                        </div>
                        <Minimap />
                    </div>
                    {console.log(data)}
                </div>
            </>
        );
    }
}

export default Map;