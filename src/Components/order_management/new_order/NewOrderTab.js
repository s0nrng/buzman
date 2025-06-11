import React from 'react';
import CustomerTab from './CustomerTab';

function NewOrderTab(){
    const mainStyle = {
        marginTop: '1%',
        width: '100%',
        height: '70%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse'
    }

    return (
        <div style={mainStyle}>
            <CustomerTab/>
        </div>
    );
}

export default NewOrderTab;