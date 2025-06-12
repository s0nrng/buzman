import React from 'react';
import CustomerTab from './CustomerTab';
import CartTab from './cart/CartTab';
import ConfirmButton from './button/ConfirmButton';
import PrintButton from './button/PrintButton';

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

    const rightStyle = {
        position: 'relative',
        backgroundColor: 'transparent',
        height: '100%',
        marginRight:'3%',
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
    
    const buttonPanelStyle = {
        position: 'relative',
        height: '9%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

    return (
        <div style={mainStyle}>
            <div style={rightStyle}>
                <CustomerTab/>
                <div style={buttonPanelStyle}>
                    <PrintButton/>
                    <ConfirmButton/>
                </div>
            </div>
            <CartTab/>
        </div>
    );
}

export default NewOrderTab;