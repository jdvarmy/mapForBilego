import React from 'react';
import styled from 'styled-components';
import {inject, observer} from "mobx-react";

const Wrapper = styled('div')`
    position: relative;
    box-sizing: border-box;
    width: 100%!important;
`;
const Label = styled('label')`
    color: #676662;
    font-size: 10px;
    line-height: 18px;
    text-transform: none;
    display: block;
    width: 100%;
    padding: 0 0 0 15px;
    text-align: left;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 7px;
    z-index: 4;
`;
const InputWrap = styled('div')`
    position: relative;
    margin-top: 0;
`;
const Input = styled('input')`
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    appearance: none;
    border-radius: 0;
    height: 66px;
    line-height: 1;
    padding: 26px 15px 20px!important;
    font-size: 18px;
    border: 1px solid rgba(0,0,0,.1);
    border-width: 1px 0;
    margin-bottom: -1px;
    position: relative;
    background: #fff;
    transition-property: border,background;
    transition-duration: .35s;
    transition-timing-function: linear;
    box-shadow: none;
    ${props => props.valid === '' || props.valid ? '' : `border-color: #D0021B`}
`;
const ErrorWpar = styled('div')`
    position: relative;
`;
const Error = styled('div')`
    position: absolute;
    right: 0;
    line-height: 1.2;
    left: 15px;
    padding-top: 0;
    top: -15px;
    font-size: 12px;
    color: #da251c;
    opacity: 0;
    z-index: 4;
    ${props => props.valid === '' || props.valid ? '' : `opacity: 1`}
`;

@inject('cartStore')
@observer
class Email extends React.Component{

    handleUserInput = e => {
        const { cartStore:{ setEmail } } = this.props;
        const name = e.target.name;
        const value = e.target.value;

        this.validateField(name, value);
        setEmail(value);
    };

    validateField = (fieldName, value) => {
        const { cartStore:{ checkEmail, checkForm } } = this.props;

        switch(fieldName) {
            case 'billing_email':
                checkEmail( value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) );
                break;
            default:
                break;
        }

        const { cartStore:{ emailValid } } = this.props;
        checkForm(emailValid);

    };

    render(){
        const { cartStore:{ email, emailValid } } = this.props;

        return(
            <Wrapper>
                <Label>Email</Label>
                <InputWrap>
                    <Input type="email" name="billing_email" id="billing_email" placeholder="address@example.com"
                           value={email}
                           valid={emailValid}
                           onChange={this.handleUserInput}
                    />
                    <ErrorWpar>
                        <Error valid={emailValid}>Обязательное поле</Error>
                    </ErrorWpar>
                </InputWrap>
            </Wrapper>
        );
    }
}

export default Email;