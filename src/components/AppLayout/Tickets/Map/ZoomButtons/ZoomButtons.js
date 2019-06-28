import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Wrapper = styled('div')`
    margin: 20px;
    position: absolute;
    right: 0;
    bottom: calc(50% - 80px);
`;
const A = styled('a')`
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
    color: #0c5a40;
    cursor: pointer;
    font-size: 24px;
    text-align: center;
    text-decoration: none;
    line-height: 42px;
    background-color: #f7f7f7;
    background-repeat: no-repeat;
    background-position: center;
    ${props=>props.disabled && `background-color: #fff; cursor: default;`};
    background-size: 10px 10px;
    &:hover{
        background-color: #ffb637;
    }
    &:active{
        background-color: #f4f4f4;
    }
    &:after{
        vertical-align: top;
        position: relative;
        bottom: 4px;
    }
`;

const ZoomIn = styled(A)`
    &:after{
        content:'+';
    }
    ${props=>props.disabled && `&:hover{background-color: #fff;}`}
`;

const ZoomOut = styled(A)`
    &:after{
        content:'-';
    }
    ${props => props.disabled && `&:hover{background-color: #fff;}`}
`;

@inject('mapStore')
@observer
class ZoomButtons extends React.Component {
    render() {
        const { mapStore:{ scale, maxscale, fitscale, handleClickZoomIn, handleClickZoomOut } } = this.props;

        return (
            <Wrapper className="bt-zoom-buttons">
                <ZoomIn
                   href='#'
                   disabled={scale === maxscale}
                   onClick={handleClickZoomIn}
                />
                <ZoomOut
                   href='#'
                   disabled={scale === fitscale}
                   onClick={handleClickZoomOut}
                />
            </Wrapper>
        );
    }
}

export default ZoomButtons;