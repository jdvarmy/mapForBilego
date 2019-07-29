import React from 'react';
import { inject, observer } from 'mobx-react';
import Form from './Form';
import { Drawer } from 'antd';

@inject('basketStore')
@observer
class Basket extends React.Component{
    render(){
        const { basketStore:{ productInBasket } } = this.props;

        return (
            <Drawer
              placement='bottom'
              visible={productInBasket}
              zIndex={1}
              closable={false}
              mask={false}
              height={76}
            >
                { productInBasket && <Form /> }
            </Drawer>
        );
    }
}

export default Basket;