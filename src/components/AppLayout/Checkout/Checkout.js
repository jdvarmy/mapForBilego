import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Wrapper = styled('div')`
    position: absolute;
    text-align: left;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    padding: 0 30px;
    ${props => props.isSmallScreen && `
        padding: 0;
    `}
    background-color: #fff;
    opacity: 0;
    transition: transform 0.2s, opacity 0.2s;
`;

@inject('serverDataStore', 'informerStore', 'thankYouStore', 'cartStore', 'basketStore', 'dataStore')
@observer
class Checkout extends React.Component{
    componentDidMount(): void {
        const { serverDataStore:{ checkoutData } } = this.props;

        this.fondyFunction(checkoutData);

        const el = ReactDOM.findDOMNode(this);
        setTimeout(() => {
            el.classList.add('fade-left')
        }, 3500);
    }

    fondyFunction = url => {
        const { informerStore:{ setMessage }, thankYouStore:{ setThankYou }, serverDataStore:{ clean }, cartStore:{ clear }, basketStore:{ clearBasket, blockingForm } } = this.props;

        // eslint-disable-next-line no-undef
        $ipsp.get('checkout').config({
            'wrapper': '#cart-checkout',
            'styles': {}
        }).scope(function () {
            this.addCallback(
                function (data, type) {
                    console.log( 'addCallback', data, type );

                    if( data.action === 'redirect' ) {
                        this.loadUrl(data.url);
                        return;
                    }

                    let send_data = false,
                        order_data = false,
                        error = false,
                        status = false;

                    if( data.send_data ){
                        send_data = true;
                        status = data.send_data.order_status
                    }else if( data.order_data ){
                        order_data = true;
                        if( data.error ) error = data.error.message;
                    }

                    if(error){
                        setMessage(error);
                        return;
                    }

                    if( send_data && status === 'processing' ){
                        return;
                    } else {
                        this.unbind('ready').action('ready', function(){
                            this.show();
                        });
                    }

                    if( (send_data && status === 'declined') || order_data ){
                        setMessage('Отказ от банка-эмитента вашей карты, возможно на карте установлены ограничения по расчетам в интернете.');
                        return;
                    }

                    if( send_data && status === 'approved' ){
                        setThankYou(true);

                        setTimeout( () => {
                            setThankYou(false);
                            clear();
                            clean();
                            clearBasket();
                            blockingForm(false);
                        }, 9000);
                    }
                }
            );

            this.loadUrl(url);
        });
    };

    render(){
        const { dataStore:{ isSmallScreen } } = this.props;
        return(
            <Wrapper isSmallScreen={isSmallScreen}  id="cart-checkout" />
        );
    }
}

export default Checkout;