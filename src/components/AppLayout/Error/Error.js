import React, { Fragment } from 'react'
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import { $css, StyledButton } from '../../styles/defaults';
import {Icon, Result} from "antd";

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

@inject('serverDataStore', 'cartStore', 'basketStore')
@observer
class Error extends React.Component{
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    returnToTheTickets = () => {
        this.clear();
        clearTimeout(this.timeout);
    };

    clear = () => {
        const { serverDataStore:{ clean }, cartStore:{ clear }, basketStore:{ clearBasket } } = this.props;
        clear();
        clean();
        clearBasket();
    };

    render(){
        const { serverDataStore:{ error } } = this.props;

        return (
            <Fragment>
                {error &&
                <Wrapper>
                    <Container>
                        <Result
                          icon={<Icon type="frown" style={{ color: $css.colors.darkCoral }}/>}
                          title={error}
                          subTitle='Произошла ошибка. А вот и email support@bilego.ru для связи с поддержкой. Мы просто оставим его здесь, вдруг пригодится.'
                          extra={
                              <Fragment>
                                  <Button onClick={this.returnToTheTickets} type="default">Возвращаемся к билетам</Button>
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

export default Error;
