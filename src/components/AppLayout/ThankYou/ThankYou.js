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
        background-color: ${$css.colors.green};
    }
    width: 254px;
    font-size: 12px;
`;

@inject('serverDataStore', 'thankYouStore', 'cartStore', 'basketStore', 'dataStore')
@observer
class ThankYou extends React.Component{
    render(){
        const { Countdown } = Statistic,
            { thankYouStore:{ setThankYou, thankYou }, serverDataStore:{ clean }, cartStore:{ clear }, basketStore:{ clearBasket } } = this.props;

        if(thankYou) {
            setTimeout( () => {
                setThankYou(false);
                clear();
                clean();
                clearBasket();
            }, 9000);
        }

        return (
            <Fragment>
            {thankYou &&
                <Wrapper>
                    <Container>
                        <Result
                            icon={<Icon type="smile" theme="twoTone"/>}
                            title="Наши поздравления и удачной вечеринки!"
                            subTitle="Билеты уже в отправлены Вам на почту. Ищите их там, ну или в папке спам."
                            extra={
                                <Fragment>
                                    <Button type="default">Возвращаемся к билетам через</Button>
                                    <Countdown value={Date.now() + 9000}/>
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