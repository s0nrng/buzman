import React from 'react';
import SearchBar from './SearchBar';
import OrderList from './OrderList';

function OrderListTab(){
    const mainStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '3%',
        width: '39%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
    }
    return (
        <div style={mainStyle}>
            <SearchBar/>
            <OrderList/>
        </div>
    )
}

export default OrderListTab;