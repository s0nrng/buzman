import React from 'react';

function CustomerInformation({customer, phone, setPhone, address, setAddress}){
    const fontSize='1.1em'
    
    const mainStyle = {
        position: 'relative',
        width: '80%',
        height: '70%',
        // backgroundColor: 'gray',
        marginTop: '5%',
        display: 'flex',
        overflowY: 'auto',
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
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
    const informationStyle = {
        position: 'absolute',
        left: '40%',
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: fontSize
        // backgroundColor: 'gray',
    }
    const inputStyle = {
        position: 'absolute',
        boxSizing: 'borderBox',
        width: '90%',
        margin: 0,
        fontSize: fontSize,
        border: 'none',
        color: 'black',
        borderBottom: '1px solid lightgray',
        fontSize: fontSize
    }


    return(
        <div style={mainStyle}>
            <div style={labelStyle}>
                <p style={{position: 'absolute', margin: 0, top: '10%'}}>Mã khách hàng:</p>
                <p style={{position: 'absolute', margin: 0, top: '25%'}}>Tên khách hàng:</p>
                <p style={{position: 'absolute', margin: 0, top: '40%'}}>Số điện thoại:</p>
                <p style={{position: 'absolute', margin: 0, top: '55%'}}>Địa chỉ:</p>
            </div>
            <div style={informationStyle}>
                <p style={{position: 'absolute', margin: 0, top: '10%', fontSize: fontSize}}>{customer.Id}</p>
                <p style={{position: 'absolute', margin: 0, top: '25%', fontSize: fontSize}}>{customer.Name}</p>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} style={{height: '8%', top: '39%', ...inputStyle}}/>
                <textarea value={address} onChange={(e)=>setAddress(e.target.value)} style={{ resize: 'none', height: '30%', top: '55%', ...inputStyle}}/>
            </div>
        </div>
    );
}

export default CustomerInformation;