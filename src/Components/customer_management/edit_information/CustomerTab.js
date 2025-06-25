import React from 'react';
import CustomerInformation from './CustomerInformation';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';

export default function CustomerTab({
    mode,
    customer,
    setMode,
    setCustomer,
    phone,
    setPhone,
    address,
    setAddress,
    name,
    setName}){

    const mainStyle = {
        position: 'relative',
        // backgroundColor: 'gray',
        width: '35%',
        height: '100%',
        marginRight: '3%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
    const buttonStyle = {
        position: 'relative',
        marginTop: '1%',
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    // console.log(customer)
    return(
        <div style={mainStyle}>
            <CustomerInformation
                mode={mode} 
                customer={customer}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                name={name}
                setName={setName}/>
            <div style={buttonStyle}>
                {mode==='edit'&&<CancelButton setMode={setMode} setCustomer={setCustomer} setPhone={setPhone} setAddress={setAddress} setName={setName}/>}
                <ConfirmButton mode={mode} setMode={setMode} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress} name={name} setName={setName} customer={customer}/>
            </div>
        </div>
    )
}