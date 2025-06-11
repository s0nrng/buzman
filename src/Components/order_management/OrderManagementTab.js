import React, {useState} from 'react';
import Header from './Header';
import OrderModeBar from './OrderModeBar';
import NewOrderTab from './new_order/NewOrderTab';

function OrderManagementTab(){
    const mainStyle = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: 5
    }

    const [orderMode, setOrderMode] = useState('new_order');

    return (
        <div style={mainStyle}>
            <Header/>
            <OrderModeBar orderMode={orderMode} setOrderMode={setOrderMode}/>
            {orderMode==='new_order' && <NewOrderTab/>}
        </div>
    );
}

export default OrderManagementTab;