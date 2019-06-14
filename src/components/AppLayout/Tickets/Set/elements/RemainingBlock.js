import React from 'react';
import styled from 'styled-components';
import { getStrEnding, moneyFormating } from '../../../functions/functions';
import {inject, observer} from 'mobx-react';

const Wrapper = styled('span')`
    color: rgb(153,153,153);
    font-size: small;
    font-style: italic;
    text-align: right;
`;
const Remaining = styled('div')``;
const Summ = styled('div')``;

@inject('setStore', 'basketStore')
@observer
class RemainingBlock extends React.Component{
    render(){
        const { stock, setStore:{ ticket:{ id } }, basketStore:{ tickets } } = this.props;

        let count = stock, summ = 0;
        for( let i=tickets.length; i--; ){
            if( id === tickets[i].id ){
                count--;
                summ += Number(tickets[i].price);
            }
        }

        return(
            <Wrapper>
                <Remaining>
                    {count !==0 ? `${ getStrEnding(count, ['доступен','доступно','доступно']) } ${count} ${ getStrEnding(count, ['билет','билета','билетов']) }` : `билетов больше нет`}
                </Remaining>
                <Summ>
                    {summ !== 0 && `выбрано на сумму ${moneyFormating(summ, true)}`}
                </Summ>
            </Wrapper>
        );
    }
}

export default RemainingBlock;