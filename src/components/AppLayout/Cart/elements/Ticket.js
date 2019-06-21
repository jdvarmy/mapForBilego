import React from 'react';
import styled from 'styled-components';
import { moneyFormating } from '../../functions/functions';

const Wrapper = styled('div')`
    padding: 8px 15px;
`;
const Container = styled('div')`
    color: #111;
    font-size: 15px;
    line-height: 18px;
`;

const PriceWrap = styled('div')`
    float: right;
    height: 100%;
    padding-left: 16px;
`;
const Price = styled('span')`
    white-space: nowrap;
    word-spacing: -2px;
    padding-right: 1px;
`;

const TicketName = styled('div')`

`;
const TicketMeta = styled('div')`
    color: rgb(133, 133, 133);
    font-size: 12px;
    line-height: 14px;
    margin-top: 4px;
`;

class Ticket extends React.Component{
    render(){
        const { ticket:{ id, name, price, sector, row, seat, type } } = this.props;
        console.log(type, name, sector)

        let nameContent, metaContent;
        if( type === 'with_map_seat' ){
            nameContent = `${row} ряд, ${seat} место`;
            metaContent = sector;
        }else if( type === 'with_map_sector' ){
            nameContent = name;
            metaContent = 'Входной билет';
        }else if( type === 'without_map' ){
            nameContent = name;
            metaContent = 'Входной билет';
        }

        return(
            <Wrapper>
                <Container>
                    <PriceWrap>
                        <Price>{moneyFormating(price, true)}</Price>
                    </PriceWrap>
                    <TicketName>{nameContent}</TicketName>
                    <TicketMeta>{metaContent}</TicketMeta>
                </Container>
            </Wrapper>
        );
    }
}

export default Ticket;