import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
    position: relative;
    width: 100%;
    height: 40%;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    padding: 10px 54px 7px 24px;
    box-sizing: border-box;
`;

const HeaderH = styled('div')`
    color: #111;
    font-size: 18px;
    text-align: left;
    line-height: 190%;
`;

const Close = styled('div')`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 18px;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    color: rgba(0,0,0,0.2);
    cursor: pointer;
    transform: rotate(45deg);
    transition: color .2s;
    user-select: none;
    &:hover{
        color: #222;
    }
`;

export default class Header extends React.Component{
    render(){
        const { name, close } = this.props;
        return(
            <Wrapper>
                <HeaderH>{name}</HeaderH>
                <Close onClick={close}>+</Close>
            </Wrapper>
        );
    }
}