import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledBoxButton } from '../../../../styles/defaults';
import {Icon} from "antd";

const Wrapper = styled('div')`
    margin: 20px;
    position: absolute;
    right: 0;
    bottom: calc(50% - 80px);
`;
const StyledBoxButtonBlock = styled(StyledBoxButton)`
    display: block;
    margin: 8px 0;
`;

@inject('mapStore')
@observer
class ZoomButtons extends React.Component {
    render() {
        const { mapStore:{ scale, maxscale, fitscale, handleClickZoomIn, handleClickZoomOut } } = this.props;

        return (
            <Wrapper className="bt-zoom-buttons">
                <StyledBoxButtonBlock
                   disabled={scale === maxscale}
                   onClick={handleClickZoomIn}
                ><Icon type="plus" /></StyledBoxButtonBlock>
                <StyledBoxButtonBlock
                   disabled={scale === fitscale}
                   onClick={handleClickZoomOut}
                ><Icon type="minus" /></StyledBoxButtonBlock>
            </Wrapper>
        );
    }
}

export default ZoomButtons;
