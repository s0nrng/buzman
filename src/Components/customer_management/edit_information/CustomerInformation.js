import React, { useState, useEffect } from 'react';

export default function CustomerInformation({mode, customer, phone, setPhone, address, setAddress, name, setName}){
    const fontSize='1.1em'
    
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

    const labelSectionStyle = {
        position: 'relative',
        width: '80%',
        height: '70%',
        marginTop: '5%',
        display: 'flex',
        overflowY: 'auto',
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
    }

    const informationSectionStyle = {
        position: 'absolute',
        left: '40%',
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: fontSize
    }

    const labelStyle = {
        position: 'absolute',
        width: '40%',
        height: '100%',
        // backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 600,
        fontSize: fontSize
    }

    const inputStyle = {
        position: 'relative',
        width: '90%',
        height: '10%',
        padding: 0,
        outline: 'none',
        border: 'none',
        outline: 'none',
        borderBottom: '1px solid lightgray',
        boxSizing: 'border-box',
        fontSize: fontSize
    }

    const textStyle={
        position:'absolute',
        marginTop: '22%',
    }
    
    useEffect(()=>{
        if (customer){
            setName(customer.Name);
            setPhone(customer.Phone);
            setAddress(customer.Address);
        }
    },[customer])
    return(
        <div style={mainStyle}>
            <div style={headerStyle}>Thông tin khách hàng</div>
            <div style={labelSectionStyle}>
                <div style={labelStyle}>
                    <p style={{position: 'absolute', margin: 0, top: '15%'}}>Mã khách hàng:</p>
                    <p style={{position: 'absolute', margin: 0, top: '33%'}}>Tên khách hàng:</p>
                    <p style={{position: 'absolute', margin: 0, top: '51%'}}>Số điện thoại:</p>
                    <p style={{position: 'absolute', margin: 0, top: '69%'}}>Địa chỉ:</p>
                </div>
                <div style={informationSectionStyle}>
                    {mode==='edit'&&<p style={textStyle}>{customer.Id}</p>}
                    <input style={{...inputStyle, top: '31%'}} value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input style={{...inputStyle, top: '39%'}} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <textarea style={{...inputStyle, top: '49%', resize: 'none', height: '25%'}} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
            </div>
            
        </div>
    )
}