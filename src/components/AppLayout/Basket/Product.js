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

const Container = styled('div')``;
const Sector = styled('div')``;
const RowSeat = styled('div')``;
const Money = styled('div')``;
const Remover = styled('b')``;

export class Product extends React.Component{
    render() {
        const { ticket:{price, sector, row, seat} } = this.props;
        const seatInfo = row && seat && (<RowSeat>ряд {row}, место {seat}</RowSeat>);

        return (
            <Wrapper>
                <Container>
                    {seatInfo}
                    <Sector>{sector}</Sector>
                    <Money><span>{moneyFormating(price, true)}</span></Money>
                    <Remover />
                </Container>
            </Wrapper>
        );
    }
}

