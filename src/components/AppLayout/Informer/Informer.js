import React from 'react';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';

const Wrapper = styled('div')``;
const Container = styled('div')`
    height: 42px;
    position: absolute;
    top: 100px;
    right: 0;
    // bottom: 0;
    left: 0;
    margin: auto;
    z-index: 100;
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-name: in-top;
`;
const InnerContainer = styled('div')`
    display: table;
    height: 100%;
    color:#111;
    margin: auto;
    max-width: 700px;
    background-color: #fff;
    border: 1px solid #ffae19;
    box-shadow: 0 10px 20px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22);
`;

const Wrap = styled('span')`
    display: table-row;
    font-size:16px;
`;

const Cell = styled('span')`
    display: table-cell;
    vertical-align: middle;
    &:last-child{
        cursor: pointer;
    }
`;

const Close = styled('div')`
    width: 42px;
    font-weight: 400;
    text-align: center;
    transform: rotate(45deg);
    color: rgba(0,0,0,0.5);
    transition: color .2s; 
    user-select: none;
    &:hover{
        color: #111;
    }
`;
const Msg = styled('div')`
    padding:0 20px;
    border-right:1px solid rgba(0,0,0,0.7);
`;

@inject('informerStore')
@observer
class Informer extends React.Component{

    componentDidMount() {
        const { informerStore:{ setMessage } } = this.props;

        if( !this.timer ) {
            this.timer = setTimeout(() => {
                setMessage('');
            }, 6000)
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    close = () => {
        const { informerStore:{ setMessage } } = this.props;

        setMessage('');
    };

    render() {
        const { informerStore:{ message } } = this.props;
        const content = message === '' ? '' : (
            <Container>
                <InnerContainer>
                    <Wrap>
                        <Cell><Msg>{message}</Msg></Cell>
                        <Cell onClick={this.close}><Close>+</Close></Cell>
                    </Wrap>
                </InnerContainer>
            </Container>
        );

        return (
            <Wrapper>
                {content}
            </Wrapper>
        );
    }
}

export default Informer;