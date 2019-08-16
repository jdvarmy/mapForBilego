import React, { Fragment } from 'react';
import styled from 'styled-components';
import {inject, Provider} from 'mobx-react';
import { SetStore } from '../../../stores/SetStore';
import ControlBlock from './elements/ControlsBlock';
import NameBlock from './elements/NameBlock';
import PriceBlock from './elements/PriceBlock';
import RemainingBlock from './elements/RemainingBlock';

const Wrapper = styled('li')`
    margin: 25px;
    padding: 20px 30px;
    display: grid;
    grid: 42px/145px auto 25% 20%;
    grid-gap: 0;
    ${p=>p.isSmallScreen && `
        grid: 56px/125px auto;
        padding: 10px 0px;
        margin: 25px 10px;
    `};
`;
const Flex = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const FlexStartCenter = styled(Flex)`
    ${p=>p.isSmallScreen 
    ? `align-items:center;` 
    : `justify-content: flex-start;`}
`;
const FlexEnd = styled(Flex)`
    ${p => p.isSmallScreen 
    ? `flex-direction:column;align-items:flex-end;`
    : `justify-content: flex-end;`}
`;

@inject('dataStore')
class SetElement extends React.Component{
    constructor(props){
        super(props);

        this.setStore = new SetStore();
        this.setStore.ticket = this.props.element
    }

    render() {
        const { ticket:{ name, stock, price_regular } } = this.setStore,
          { dataStore:{ isSmallScreen } } = this.props;

        return (
            <Provider setStore={this.setStore}>
                <Wrapper isSmallScreen={isSmallScreen}>
                    <FlexStartCenter isSmallScreen={isSmallScreen}>
                        <ControlBlock />
                    </FlexStartCenter>
                    {!isSmallScreen
                      ?
                      <Fragment>
                          <FlexStartCenter>
                              <NameBlock name={name}/>
                          </FlexStartCenter>
                          <FlexEnd>
                              <RemainingBlock stock={stock} />
                          </FlexEnd>
                          <FlexEnd>
                              <PriceBlock price={price_regular} />
                          </FlexEnd>
                      </Fragment>
                      :
                      <Fragment>
                          <FlexEnd isSmallScreen={isSmallScreen}>
                              <NameBlock name={name} />
                              <PriceBlock price={price_regular} />
                          </FlexEnd>
                      </Fragment>
                    }
                </Wrapper>
            </Provider>
        );
    }
}

export default SetElement;