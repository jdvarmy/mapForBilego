import React from 'react'
import { moneyFormating } from '../functions/functions'

export class Product extends React.Component{
    render() {
        const { ticket:{price_regular, sector_name, row_name, seat_name} } = this.props;
        const seatInfo = row_name && seat_name && (<div className="seat-info">ряд {row_name}, место {seat_name}</div>);

        return (
            <div>
                <div className="bt-product">
                    {seatInfo && seatInfo}
                    <div className="sector-info">{sector_name}</div>
                    <div className="money-info"><span>{moneyFormating(price_regular, true)}</span></div>
                    <b className="bt-product-remover" />
                </div>
            </div>
        );
    }
}

