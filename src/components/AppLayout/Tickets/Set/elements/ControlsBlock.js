import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { StyledBoxButton, $css } from '../../../../styles/defaults';
import { Icon } from 'antd';

const Wrapper = styled('div')``;
const Container = styled('div')`
    display: inline-block;
    user-select: none;
`;
const Amount = styled(Container)`
    vertical-align: middle;
    padding: 0 14px;
    font-size: 20px;
    color: ${$css.colors.black};
`;
const Button = styled(StyledBoxButton)`
    padding: 0;
`;

@inject('setStore', 'basketStore')
@observer
class ControlBlock extends React.Component{
    handlerClickMinus = () => {
        const { basketStore:{ toBasket }, setStore:{ ticket } } = this.props;
        toBasket( ticket, false );
    };
    handlerClickPlus = () => {
        const { basketStore:{ toBasket }, setStore:{ ticket } } = this.props;
        toBasket( ticket, true );
    };

    render(){
        const { setStore:{ ticket:{ id, stock } }, basketStore:{ tickets, isFull } } = this.props;

        let count = 0;
        for( let i=tickets.length; i--; ){
            if( id === tickets[i].id ){
                count++;
            }
        }

        return(
            <Wrapper>
                <Button onClick={this.handlerClickMinus} disabled={count <= 0}>
                    <Icon type="minus" />
                </Button>
                <Amount>{count}</Amount>
                <Button onClick={this.handlerClickPlus} disabled={count >= stock || isFull}>
                    <Icon type="plus" />
                </Button>
            </Wrapper>
        );
    }
}

export default ControlBlock;