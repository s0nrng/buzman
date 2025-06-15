import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import CustomerInformation from './CustomerInformation';


function CustomerTab({phone, setPhone, customer, setCustomer, address, setAddress}){
    const mainStyle = {
        position: 'relative',
        backgroundColor: 'white',
        height: '89%',
        width: '100%',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        alignItems: 'center',
        // fontFamily: 'RedditSans, sans-serif'
    }

    const headerStyle = {
        display: 'flex',
        position: 'relative',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: '7%',
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        fontSize: '2em',
        fontWeight: 600
    }


    return (
        <div style={mainStyle}>
            <div style={headerStyle}>Thông tin khách hàng</div>
            <SearchBar setCustomer={setCustomer} setPhone={setPhone} setAddress={setAddress}/>
            {customer &&
            <CustomerInformation customer={customer} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress}/>
            }
            
        </div>
    );
}

export default CustomerTab;