import React, { Fragment } from 'react'
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import { Result, Icon, Statistic } from 'antd';
import { StyledButton, $css } from '../../styles/defaults';

const Wrapper = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${$css.colors.white};
    z-index: 101;
`;
const Container = styled('div')`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Button = styled(StyledButton)`
    padding: 8px 20px;
    height: 46px;
    &.ant-btn:focus{
        background-color: ${$css.colors.red};
    }
    width: 254px;
    font-size: 12px;
`;

@inject('serverDataStore', 'thankYouStore', 'cartStore', 'basketStore', 'dataStore')
@observer
class ThankYou extends React.Component{
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    returnToTheTickets = () => {
        this.clear();
        clearTimeout(this.timeout);
    };

    clear = () => {
        const { thankYouStore:{ setThankYou }, serverDataStore:{ clean }, cartStore:{ clear }, basketStore:{ clearBasket } } = this.props;
        setThankYou(false);
        clear();
        clean();
        clearBasket();
    };

    render(){
        const { Countdown } = Statistic,
            { thankYouStore:{ thankYou } } = this.props;

        if(thankYou) {
            this.timeout = setTimeout( () => {
                this.clear();
            }, 20000);
        }

        return (
            <Fragment>
            {thankYou &&
                <Wrapper>
                    <Container>
                        <Result
                            icon={<Icon type="smile" style={{ color: $css.colors.red }}/>}
                            title="Наши поздравления!"
                            subTitle="Вы успешно купили билеты, и они уже ждут вас на почте. Ищите их там, ну или в папке спам. Удачного отдыха!"
                            extra={
                                <Fragment>
                                    <Button onClick={this.returnToTheTickets} type="default">Возвращаемся к билетам через</Button>
                                    <Countdown value={Date.now() + 20000}/>
                                </Fragment>
                            }
                            status="success"
                        />
                    </Container>
                </Wrapper>
            }
            </Fragment>
        )
    }
}

export default ThankYou;
