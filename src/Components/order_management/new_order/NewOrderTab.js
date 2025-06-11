import React from 'react';
import CustomerTab from './CustomerTab';
import CartTab from './cart/CartTab';

function NewOrderTab(){
    const mainStyle = {
        marginTop: '1%',
        width: '100%',
        height: '70%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }

    return (
        <div style={mainStyle}>
            <CustomerTab/>
            <CartTab/>
        </div>
    );
}

export default NewOrderTab;