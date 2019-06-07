import React from 'react';
import styled from 'styled-components';

import { moneyFormating } from '../functions/functions';
import { inject, observer } from 'mobx-react';

const Wrapper = styled('div')`
    width: ${ props=>props.widthPercent }%;
    // display: table-cell;
    position: relative;
    // z-index: 1;
    
    display: inline-block;
    // position: absolute;
    // right: 0;
`;

const Container = styled('div')`
    margin: -13px -13px -13px 0px;
    min-height: 90px;
    width: 152px;
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgb(255, 255, 255);
    border-width: 1px 1px 0px;
    border-style: solid solid solid;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
    border-image: initial;
    border-bottom: 0px;
    padding: 12px 24px;
    text-align: left;
    transition: margin 0.2s ease 0s;
    // &::before{
    //     content: "";
    //     width: 100%;
    //     height: 20px;
    //     display: block;
    //     position: absolute;
    //     top: -20px;
    //     left: 0px;
    //     overflow: hidden;
    //     background: transparent;
    // }
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
const RowSeat = styled(ContentWrapper)``;
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
    background-color: rgb(51, 51, 51);
    cursor: pointer;
    position: absolute;
    top: -8px;
    right: -8px;
    overflow: hidden;
    background-position: 50% center;
    background-repeat: no-repeat;
    border-radius: 100%;
`;

@inject('basketStore')
@observer
class Product extends React.Component{
    render() {
        const { ticket:{price, sector, row, seat}, basketStore:{count} } = this.props;

        const seatInfo = row && seat && (<RowSeat>ряд {row}, место {seat}</RowSeat>);
        const width = 100 / count;

        return (
            <Wrapper widthPercent={ width }>
                <Container>
                    {seatInfo}
                    <Sector createBeforeEl={row && seat}>{sector}</Sector>
                    <ContentWrapper>
                        <Money>
                            <span>{moneyFormating(price, true)}</span>
                        </Money>
                    </ContentWrapper>
                    <Remover />
                </Container>
            </Wrapper>
        );
    }
}

export default Product;