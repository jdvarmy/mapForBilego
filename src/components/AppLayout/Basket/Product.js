import React from 'react'
import { moneyFormating } from '../functions/functions'

export class Product extends React.Component{
    render() {
        const { ticket:{price, sector, row, seat} } = this.props;
        const seatInfo = row && seat && (<div className="seat-info">ряд {row}, место {seat}</div>);

        return (
            <div>
                <div className="bt-product">
                    {seatInfo && seatInfo}
                    <div className="sector-info">{sector}</div>
                    <div className="money-info"><span>{moneyFormating(price, true)}</span></div>
                    <b className="bt-product-remover" />
                </div>
            </div>
        );
    }
}

