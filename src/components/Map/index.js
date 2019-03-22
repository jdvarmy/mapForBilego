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

export default class Map extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            width: parseInt(this.props.data.map_data.data.width),
            height: parseInt(this.props.data.map_data.data.height),
            top: 0,
            left: 0,

            x: 0,
            y: 0,
            scale: 1,
            fitscale: 0,
            maxscale: 5,
        }
    }

    componentDidMount(): void {
        window.addEventListener("resize", this.dimensions);
    }

    dimensions = () =>{
        console.log(this)
        // let w = window.innerWidth,
        //     h = window.innerHeight;
        //
        // let wr = this.containerMap.offsetWidth / this.state.width,
        //     hr = this.containerMap.offsetHeight / this.state.height;
        //
        // if (wr < hr) this.setState( { fitscale: wr });
        // else this.setState( { fitscale: hr });
        //
        // console.log(this.containerMap)
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
                    <div className="bt-container map" onLoad={this.dimensions} ref={(input)=>{this.containerMap = input}}>
                        <div className="btm-map btm-zoomable" style={{
                            width: this.state.width,
                            height: this.state.height,
                            top: this.state.top,
                            left: this.state.left
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