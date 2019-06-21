import React from 'react';
import styled from 'styled-components';

const Li = styled('li')`
    list-style: none;
    width: ${ props => 100 / props.count }%;
    max-width: 70px;
    display: table-cell;
    position: relative;
    cursor: pointer;
    font-size: 13px;
    padding: 12px 0px 17px;
    margin: 0px;
`;

const ColorLine = styled('i')`
    height: 3px;
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0px;
    overflow: hidden;
    margin: 0px;
    transition: all 0.1s ease 0s;
    &::after{
        content: "";
        display: block;
        height: 100%;
        background-color: ${ props => props.color };
        margin: 0px 3px 0px 0px;
    }
`;
const Span = styled('span')`
    font-size: 13px;
`;
const Money = styled(Span)`
    white-space: nowrap;
    word-spacing: -2px;
    padding-right: 1px;
`;
const Plus = styled(Span)``;

export default class Item extends React.Component{
    render() {
        const { el, len } = this.props;

        return(
            <Li count={len}>
                <ColorLine color={el[1]} />
                <Money>{el[0]}</Money>
                <Plus>+</Plus>
            </Li>
        );
    }
}