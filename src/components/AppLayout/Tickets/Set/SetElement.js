import React from 'react';
import styled from 'styled-components';
import { Provider } from 'mobx-react';
import { SetStore } from '../../../stores/SetStore'

import ControlBlock from './elements/ControlsBlock';
import NameBlock from './elements/NameBlock';
import PriceBlock from './elements/PriceBlock';
import RemainingBlock from './elements/RemainingBlock';

const Wrapper = styled('li')`
    margin: 25px;
    padding: 20px 30px;
    display: grid;
    grid: 40px/20% 35% 25% 20%;
    grid-gap: 0;
`;

const Flex = styled('div')`
    display: flex;
    align-items: center;
`;
const FlexStart = styled(Flex)`
    justify-content: flex-start;
`;
const FlexEnd = styled(Flex)`
    justify-content: flex-end;
`;

class SetElement extends React.Component{
    constructor(props){
        super(props);

        this.setStore = new SetStore();
        this.setStore.ticket = this.props.element
    }

    render() {
        const { ticket:{ name, stock, price_regular } } = this.setStore;

        return (
            <Provider setStore={this.setStore}>
                <Wrapper>
                    <FlexStart>
                        <ControlBlock />
                    </FlexStart>
                    <FlexStart>
                        <NameBlock name={name}/>
                    </FlexStart>
                    <FlexEnd>
                        <RemainingBlock stock={stock} />
                    </FlexEnd>
                    <FlexEnd>
                        <PriceBlock price={price_regular} />
                    </FlexEnd>
                </Wrapper>
            </Provider>
        );
    }
}

export default SetElement;