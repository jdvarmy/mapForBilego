import React, { Fragment } from 'react';
import { $css, StyledModal, StyledBoxButton } from '../../../../styles/defaults';
import { inject, observer } from 'mobx-react';
import {getStrEnding, moneyFormating} from '../../../functions/functions';
import styled from 'styled-components';
import { Row, Col, Icon } from 'antd';
import Informer from '../../../Informer/Informer';

const Font = styled('div')`
    font-size: 18px;
    color: ${$css.colors.black};
`;
const Number = styled(Font)`
    display: inline-block;
    margin: 0 15px;
`;
const UpFont = styled(Font)`
    font-weight: 500;
`;

@inject('basketStore')
@observer
class ModalTickets extends React.Component{
    getTicketById = id => {
        let nodes = [];
        const { basketStore:{ tickets } } = this.props;
        // eslint-disable-next-line array-callback-return
        tickets.map(ticket=>{
            if(ticket.id === id) nodes.push(ticket)
        });

        return nodes;
    };

    plus = () => {
        const { basketStore:{ setOfTicket, toBasket, isFull, maxCountInBasket } }  = this.props;
        if( isFull ){
            Informer({
                title: 'Опаньки!',
                text: `За один заказ можно купить только ${maxCountInBasket} ${getStrEnding(maxCountInBasket, ['билет','билета','билетов'])}`
            });
        }
        toBasket( setOfTicket, true );
    };

    minus = () => {
        const { basketStore:{ setOfTicket, toBasket } } = this.props;
        toBasket( setOfTicket, false );
    };

    render(){
        const { basketStore: { modalTickets, closeModalTickets, setOfTicket, isFull } } = this.props,
            ticket = setOfTicket && this.getTicketById(setOfTicket.id);

        const disabledMinus = setOfTicket && ticket.length===0;
        const disabledPlus = setOfTicket && (isFull || ticket.length >= setOfTicket.stock);

        return(
            <StyledModal
                visible={modalTickets}
                centered
                onOk={closeModalTickets}
                onCancel={closeModalTickets}
                footer={null}
                width={296}
                title={setOfTicket && setOfTicket.name}
                icon={<Icon type="close-circle" />}
                iconType='close-circle'
            >
                {setOfTicket &&
                    <Fragment>
                        <Row align='middle' justify='center'>
                            <Col span={12}>
                                <UpFont>{moneyFormating(setOfTicket.price, true)}</UpFont>
                                <div>Входной билет</div>
                            </Col>
                            <Col span={12}>
                                <StyledBoxButton disabled={disabledMinus} onClick={this.minus}><Icon type="minus" /></StyledBoxButton>
                                <Number><span>{ticket.length}</span></Number>
                                <StyledBoxButton disabled={disabledPlus} onClick={this.plus}><Icon type="plus" /></StyledBoxButton>
                            </Col>
                        </Row>
                    </Fragment>
                }
            </StyledModal>
        );
    }
}

export default ModalTickets;