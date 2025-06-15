import React from 'react';
import OrderListTab from './OrderListTab';

function PlacedOrderTab(){
    const mainStyle = {
        marginTop: '1%',
        width: '100%',
        height: '70%',
        position: 'relative',
        display: 'flex',
        // backgroundColor: 'gray',
        boxSizing: 'border-box',
    }
    return (
        <div style={mainStyle}>
            <OrderListTab/>
        </div>
    )
}

export default PlacedOrderTab;