import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Informer from '../Informer/Informer';

const Wrapper = styled('div')`
    height: 100%;
    width: 100%;
`;

@inject('thankYouStore', 'serverDataStore')
@observer
class Checkout extends React.Component{
    componentDidMount() {
        const { serverDataStore:{ checkoutData } } = this.props;
        this.fondyFunction(checkoutData);
    }

    fondyFunction = url => {
        const { thankYouStore:{ setThankYou } } = this.props;
        // eslint-disable-next-line no-undef
        $ipsp.get('checkout').config({
            'wrapper': '#cart-checkout',
            'styles': {}
        }).scope(function () {
            this.addCallback(
                function (data, type) {
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
                      Informer({
                        title: 'Ошибка!',
                        text: error
                      });
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
                      Informer({
                        title: 'Ответ от банка!',
                        text: 'Отказ от банка-эмитента вашей карты, возможно на карте установлены ограничения по расчетам в интернете.'
                      });
                        return;
                    }

                    if( send_data && status === 'approved' ){
                        setThankYou(true);
                    }
                }
            );

            this.loadUrl(url);
        });
    };

    render(){
        return(
            <Wrapper id="cart-checkout" />
        );
    }
}

export default Checkout;
