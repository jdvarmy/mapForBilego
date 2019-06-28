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
    // animation-duration: 0.2s;
    // animation-timing-function: cubic-bezier(0,0,0.88,1);
    // animation-fill-mode: both;
    opacity: 0;
    // transform: translate3d(-100%,0,0);
    transition: transform 0.2s, opacity 0.2s;
    // animation-name: in-left;
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

                    // true
                    // action: "redirect"
                    // token: "baa727b73375d289325d5f587e24ae3904fde1e2"
                    // url: "https://api.fondy.eu/api/checkout/redirect/callback/1133802477/7eaa9adb63a1affc4f909d536149d1c1ed8e4ecb"
                    //
                    // action: "submit"
                    // final: true
                    // method: "POST"
                    // send_data:
                    //     actual_amount: "250000"
                    //     actual_currency: "RUB"
                    //     amount: "250000"
                    //     approval_code: "027440"
                    //     card_bin: 444455
                    //     card_type: "VISA"
                    //     currency: "RUB"
                    //     eci: "05"
                    //     fee: ""
                    //     masked_card: "444455XXXXXX1111"
                    //     merchant_data: ""
                    //     merchant_id: 1396424
                    //     order_id: "597:1561464820"
                    //     order_status: "approved"
                    //     order_time: "25.06.2019 15:13:41"
                    //     parent_order_id: ""
                    //     payment_id: 152520238
                    //     payment_system: "card"
                    //     product_id: ""
                    //     rectoken: ""
                    //     rectoken_lifetime: ""
                    //     response_code: ""
                    //     response_description: ""
                    //     response_signature_string: "**********|250000|RUB|250000|027440|444455|VISA|RUB|05|444455XXXXXX1111|1396424|597:1561464820|approved|25.06.2019 15:13:41|152520238|card|success|0|429417347068|chekist.87@mail.ru|0|purchase"
                    //     response_status: "success"
                    //     reversal_amount: "0"
                    //     rrn: "429417347068"
                    //     sender_account: ""
                    //     sender_cell_phone: ""
                    //     sender_email: "chekist.87@mail.ru"
                    //     settlement_amount: "0"
                    //     settlement_currency: ""
                    //     settlement_date: ""
                    //     signature: "9053b77640d6a1dcb45e328af86f04757397b5df"
                    //     tran_type: "purchase"
                    //     verification_status: ""
                    //     __proto__: Object
                    // target: "_top"
                    // token: "f454954b339817ca9bd0d3792596fe56aa54c9ef"
                    // url: "https://evenpic.ru/?wc-api=Bilego_Tickets_Gates_Fondy"
                    //
                    //
                    // false
                    // action: "redirect"
                    // token: "13de75687a0da7b9eb12f4a3482bd78a25115628"
                    // url: "https://api.fondy.eu/api/checkout?token=13de75687a0da7b9eb12f4a3482bd78a25115628"
                    //
                    // api_version: "1.0.0"
                    // error:
                    //     code: 2009
                    //     message: "Во время платежа произошла ошибка. Заказ был уже оплачен ранее."
                    // __proto__: Object
                    // order_data:
                    //     actual_amount: "70000"
                    //     actual_currency: "RUB"
                    //     amount: "70000"
                    //     approval_code: "027440"
                    //     card_bin: 444455
                    //     card_type: "VISA"
                    //     currency: "RUB"
                    //     eci: "05"
                    //     fee: ""
                    //     masked_card: "444455XXXXXX1111"
                    //     merchant_data: ""
                    //     merchant_id: 1396424
                    //     order_id: "617:1561479158"
                    //     order_status: "approved"
                    //     order_time: "25.06.2019 19:12:38"
                    //     parent_order_id: ""
                    //     payment_id: 152555814
                    //     payment_system: "card"
                    //     product_id: ""
                    //     rectoken: ""
                    //     rectoken_lifetime: ""
                    //     response_code: ""
                    //     response_description: ""
                    //     response_signature_string: "**********|70000|RUB|70000|027440|444455|VISA|RUB|05|444455XXXXXX1111|1396424|617:1561479158|approved|25.06.2019 19:12:38|152555814|card|success|0|429417347068|chekist.87@mail.ru|0|purchase"
                    //     response_status: "success"
                    //     reversal_amount: "0"
                    //     rrn: "429417347068"
                    //     sender_account: ""
                    //     sender_cell_phone: ""
                    //     sender_email: "chekist.87@mail.ru"
                    //     settlement_amount: "0"
                    //     settlement_currency: ""
                    //     settlement_date: ""
                    //     signature: "2fc86c16ece7d64ef1e82ee99312403db4d9775c"
                    //     tran_type: "purchase"
                    //     verification_status: ""
                    // pending: false
                    // response_status: "success"
                    // response_url: "https://evenpic.ru/?wc-api=Bilego_Tickets_Gates_Fondy"
                    // target: "_top"
                    // url: "https://evenpic.ru/?wc-api=Bilego_Tickets_Gates_Fondy"

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