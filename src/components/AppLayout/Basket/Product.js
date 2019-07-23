import React from 'react';
import styled from 'styled-components';

import { moneyFormating } from '../functions/functions';
import { inject, observer } from 'mobx-react';

const Wrapper = styled('div')`
    width: ${ props=>props.widthPercent }%;
    position: relative;
    box-sizing: border-box;
    display: inline-block;
`;

const Container = styled('div')`
    margin: -13px -13px -13px 0px;
    min-height: 90px;
    width: ${props=>props.widthDiv < 1201 ? 112 : 152}px;
    position: absolute;
    top: 0px;
    right: 12px;
    background: rgb(255, 255, 255);
    border-width: 1px 1px 0px;
    border-style: solid solid solid;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
    border-image: initial;
    border-bottom: 0px;
    padding: 12px 24px;
    text-align: right;
    transition: all 0.2s ease 0s;
    &:hover{
        border-color: #ffae19 #ffae19;
        margin-top: -29px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22);
        z-index: 1;
    }
    &:hover b{
        display: block;
    }
`;
const ContentWrapper = styled('div')`
    color: rgb(51, 51, 51);
    font-size: 15px;
    line-height: 19px;
    padding-top: 4px;
`;

const Sector = styled('div')`
    padding-top: 4px;
    color: rgb(153, 153, 153);
    font-size: 13px;
    line-height: 18px;
`;
const RowSeat = styled(ContentWrapper)`
    font-size: 14px;
`;
const Money = styled(ContentWrapper)`
    & > span{
        white-space: nowrap;
        word-spacing: -2px;
        padding-right: 1px;
    }
`;
const Remover = styled('b')`
    width: 26px;
    height: 26px;
    display: none;
    background-color: #ffae19;
    cursor: pointer;
    position: absolute;
    top: -8px;
    left: -8px;
    overflow: hidden;
    background-position: 50% center;
    background-repeat: no-repeat;
    border-radius: 100%;
    &::after{
        content: '+';
        font-size: 17px;
        display: block;
        text-align: center;
        width: 100%;
        height: 100%;
        transform: rotate(45deg);
        color: #fff;
    }
`;

@inject('basketStore', 'mapStore', 'serverDataStore')
@observer
class Product extends React.Component{
    removeFromBasket = e => {
        const { basketStore:{toBasket, seatStores}, ticket, serverDataStore:{data:{ticketcloud}} } = this.props;
        toBasket( ticket, false );

        for( let key in seatStores ){
            if( !ticketcloud ) key = +key;
            if( key === ticket.id )
                seatStores[key].onClick();
        }
    };

    render() {
        const { ticket:{price, sector, row, seat, name, type}, basketStore:{count}, mapStore:{containerW} } = this.props;

        const seatInfo = ( row && seat && (<RowSeat>ряд {row}, место {seat}</RowSeat>) ) || ( type === 'without_map' && <Sector>{name}</Sector> );
        const width = 100 / count;

        return (
            <Wrapper widthPercent={ width }>
                <Container widthDiv={containerW}>
                    {seatInfo}
                    <Sector createBeforeEl={row && seat}>{sector}</Sector>
                    <ContentWrapper>
                        <Money>
                            <span>{moneyFormating(price, true)}</span>
                        </Money>
                    </ContentWrapper>
                    <Remover
                        onClick={ this.removeFromBasket }
                    />
                </Container>
            </Wrapper>
        );
    }
}

export default Product;