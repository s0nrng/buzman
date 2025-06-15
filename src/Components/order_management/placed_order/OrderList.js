import React from 'react';
import Header from './Header';
import Content from './Content';


function OrderList(){
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
            <Content/>
        </div>
    )
}

export default OrderList;