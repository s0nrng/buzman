import React, {useState} from 'react';
import Header from './Header';
import OrderModeBar from './OrderModeBar';
import NewOrderTab from './new_order/NewOrderTab';
import PlacedOrderTab from './placed_order/PlacedOrderTab';
import PackedOrderTab from './packed_order/PackedOrderTab';
import FinishedOrderTab from './finished_order/FinishedOrderTab';

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
            {orderMode==='placed_order' && <PlacedOrderTab/>}
            {orderMode==='packed_order' && <PackedOrderTab/>}
            {orderMode==='finished_order' && <FinishedOrderTab/>}
        </div>
    );
}

export default OrderManagementTab;