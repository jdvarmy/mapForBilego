import React from 'react';
import styled from 'styled-components';

import { moneyFormating } from '../functions/functions';

const Wrapper = styled('div')`
    font-size: 14px;
    display: inline-block;
    float: right;
    text-align: right;
    width: 100px;
`;

export class Product extends React.Component{
    render() {
        const { ticket:{price, sector, row, seat} } = this.props;
        const seatInfo = row && seat && (<div className="seat-info">ряд {row}, место {seat}</div>);

        return (
            <Wrapper>
                <div className="bt-product">
                    {seatInfo && seatInfo}
                    <div className="sector-info">{sector}</div>
                    <div className="money-info"><span>{moneyFormating(price, true)}</span></div>
                    <b className="bt-product-remover" />
                </div>
            </Wrapper>
        );
    }
}

