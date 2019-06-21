import React from 'react';
import styled from 'styled-components';
import {inject, observer} from "mobx-react";

const Wrapper = styled('div')``;

const Button = styled('button')`
    text-align: center;
    border: none;
    width: auto;
    cursor: pointer;
    color: #fff;
    background: #0c5a40;
    padding: 7px 15px;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    height: 46px;
    color: #fff;
    background: #0c5a40;
    text-transform: uppercase;
    padding: 8px 20px;
    background: #ffae19;
    transition: all .5s;
    outline: none;
`;

const TotalOrderWrap = styled('div')`
    text-align: right;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    margin-bottom: 15px;
`;
const TotalOrder = styled('div')`
    white-space: nowrap;
    word-spacing: -2px;
    font-size: 20px;
    line-height: 21px;
    font-weight: 700;
`;
const Meta = styled('div')`
    color: #676662;
    clear: both;
    font-size: 11px;
    line-height: 13px;
`;

const ButtonNext = styled('div')`
    float: right;
    & button{
        background: #0c5a40;
        &:hover{
            background: #ffae19;
        }
    }
`;
const ButtonPrev = styled('div')`
    float: left;
    & button{
        background: #ffae19;
        &:hover{
            background: #0c5a40;
        }
    }
`;
const Link = styled('a')`
    color: #ffae19;
    text-decoration: none;
    outline: none;
    transition: all .5s;
    &:hover{
        color: #0f7855;
    }
`;

@inject('cartStore', 'basketStore')
class Footer extends React.Component{
    close = () => {
        const { cartStore:{ clear }, basketStore:{ blockingForm } } = this.props;

        clear();
        blockingForm(false);
    };

    render(){
        const { cartStore:{ city, total } } = this.props,
            href = `https://${city}.bilego.ru/offer/`;

        return(
            <Wrapper>
                <TotalOrderWrap>
                    <TotalOrder>{total}</TotalOrder>
                    <Meta>Нажимая кнопку «перейти к оплате», вы соглашаетесь с условиями <Link href={href} target="_blank">оферты</Link></Meta>
                </TotalOrderWrap>
                <ButtonNext>
                    <Button>Перейти к оплате</Button>
                </ButtonNext>
                <ButtonPrev>
                    <Button onClick={this.close}>Назад</Button>
                </ButtonPrev>
            </Wrapper>
        );
    }
}

export default Footer;