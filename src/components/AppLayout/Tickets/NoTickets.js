import React, { Fragment } from 'react';
import styled from 'styled-components';
import { $css } from '../../styles/defaults';
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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

class NoTickets extends React.Component{
  render(){
    return (
      <Fragment>
        <Wrapper>
          <Container>
            <Result
              icon={<Icon type="meh" style={{ color: $css.colors.darkGrey }}/>}
              title='Все билеты на это мероприятие распроданы!'
              subTitle='Вы можете посмотреть другие интересные события.'
              status="success"
            />
          </Container>
        </Wrapper>
      </Fragment>
    )
  }
}

export default NoTickets;