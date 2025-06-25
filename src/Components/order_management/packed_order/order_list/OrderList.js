import React from 'react';
import Header from './Header';
import Content from './Content';


function OrderList({cartContent, setCartContent, searchMode, setEditMode, setSelectedOrder, setCustomer, setProducts}){
    const mainStyle = {
        width: '100%',
        // backgroundColor: 'gray',
        height: '88%',
        // borderRadius: 10,
        // boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
    }
    return (
        <div style={mainStyle}>
            <Header/>
            <Content searchMode={searchMode} cartContent={cartContent} setCartContent={setCartContent} setEditMode={setEditMode} setSelectedOrder={setSelectedOrder} setCustomer={setCustomer} setProducts={setProducts}/>
        </div>
    )
}

export default OrderList;