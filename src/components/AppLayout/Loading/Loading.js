import React from 'react';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';
import {$css, Animation} from '../../styles/defaults';

const Wrapper = styled(Animation)`
    width: 100%;
    height: ${$css.sizes.containerH};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;
const Content = styled('canvas')`
    width: 100%;
    height: 100%;
    min-height: ${$css.sizes.containerH};
    display: block;
    opacity: 1;
    margin: 0 auto;
`;

@inject('serverDataStore')
@observer
class Loading extends React.Component{
    constructor() {
        super();
        this.options = {
            speed: 65,
            shootNum: 0,
            scale: 0.8
        };
        this.loadWrap = React.createRef();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const {serverDataStore: {loading}} = this.props;
        if(!loading) {
            this.timeout = setTimeout(() => {
                this.stop();
                this.loadWrap.current.style.display = 'none';
            }, $css.animation.duration)
        }
        if(loading) {
            this.loadWrap.current.style.display = 'block';
            this.start();
        }
    }

    componentDidMount(){
        this.getElems();
        this.start();
    }

    componentWillUnmount(){
        this.stop();
    };

    getElems = () => {
        this.cont = this.loadWrap.current.lastChild.getContext('2d');
        const {serverDataStore: {loadingImage}} = this.props;

        const images = require.context('./', true, /loading.*/);
        this.images = images.keys()
          .map(key => {
              return {src: images(key)}
          });

        let img = document.createElement('img');
        img.src = this.images[loadingImage-1].src;
        this.spride = img;
    };
    
    start = () => {
        const width = this.loadWrap.current.getBoundingClientRect().width,
            height = this.loadWrap.current.getBoundingClientRect().height;

        this.loadWrap.current.lastChild.setAttribute('width', width);
        this.loadWrap.current.lastChild.setAttribute('height', height);

        this.init = setInterval(() => {
            this.cont.clearRect(0, 0, width, height);
            this.drawImageLoader();
        }, this.options.speed);

    };
    
    stop = () => {
        clearInterval(this.init);
        clearTimeout(this.timeout);
    };

    drawImageLoader = () => {
        const max = 23;
        if (this.options.shootNum >= max){
            this.options.shootNum = 1;
        }else{
            this.options.shootNum ++;
        }

        let x, y, wx, wy;
        x = this.options.shootNum * 230;
        y = 0;
        wx = 230;
        wy = 420;

        this.cont.drawImage(
            this.spride,
            x,
            y,
            wx,
            wy,
            (this.loadWrap.current.getBoundingClientRect().width - (wx * this.options.scale)) / 2,
            (this.loadWrap.current.getBoundingClientRect().height - (wy * this.options.scale)) / 2,
            wx * this.options.scale,
            wy * this.options.scale
        )
    };

    render() {
        const {serverDataStore: {loading}} = this.props;
        return (
            <Wrapper ref={this.loadWrap} loading={loading}>
                <Content width={0} height={0} />
            </Wrapper>
        );
    }
}

export default Loading;