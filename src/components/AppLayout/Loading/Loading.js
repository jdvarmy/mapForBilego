import React from 'react';
import styled from 'styled-components';

import logo from './loading-v1.png';
import {inject, observer} from 'mobx-react';

const Wrapper = styled('canvas')`
    width: 100%;
    min-height: 645px;
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
            scale: 0.8,
            screenWidth: 1018
        };
    }

    componentDidMount(){
        this.element = document.querySelector('#loading');
        this.context = this.element.getContext('2d');
        this.container = document.querySelector('#bilego-sell-tickets');

        let img = document.createElement('img');
        img.src = logo;
        this.spride = img;

        const { serverDataStore: { data } } = this.props;
        if(!data) {
            this.start();
        }
    }

    componentWillUnmount(){
        this.stop();
    };
    
    start = () => {
        if( this.container.classList.contains('loading') ) return;
        const width = this.container.getBoundingClientRect().width,
            height = this.container.getBoundingClientRect().height;

        this.container
            .classList.add('loading');
        this.element
            .setAttribute('width', width);
        this.element
            .setAttribute('height', height);

        this.init = setInterval(() => {
            this.context.clearRect(0, 0, width, height );
            this.drawImageLoader();
        }, this.options.speed);
    };
    
    stop = () => {
        this.container.classList.remove('loading');
        setTimeout(function(){
            clearInterval( this.init );
        }, 700);
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

        this.context.drawImage(
            this.spride,
            x,
            y,
            wx,
            wy,
            (this.container.getBoundingClientRect().width - (wx * this.options.scale)) / 2,
            (this.container.getBoundingClientRect().height - (wy * this.options.scale)) / 2,
            wx * this.options.scale,
            wy * this.options.scale
        )
    };

    windowWidth = () => {
        return window.innerWidth > this.options.screenWidth;
    };

    render() {
        return (
            <Wrapper id="loading" width={0} height={0} />
        );
    }
}

export default Loading;