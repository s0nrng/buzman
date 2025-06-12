import React from 'react';

function CustomerInformation(){
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
    }
    const informationStyle = {
        position: 'absolute',
        left: '40%',
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'gray',
    }
    const inputStyle = {
        position: 'absolute',
        boxSizing: 'borderBox',
        width: '90%',
        margin: 0,
        fontSize: '1em',
        border: 'none',
        borderBottom: '1px solid lightgray'
    }

    const example_address = "108 đường Lê Trọng Tấn, phường Phú La, quận Hà Đông, thành phố Hà Nội";
    return(
        <div style={mainStyle}>
            <div style={labelStyle}>
                <p style={{position: 'absolute', margin: 0, top: '10%'}}>Mã khách hàng:</p>
                <p style={{position: 'absolute', margin: 0, top: '25%'}}>Tên khách hàng:</p>
                <p style={{position: 'absolute', margin: 0, top: '40%'}}>Số điện thoại:</p>
                <p style={{position: 'absolute', margin: 0, top: '55%'}}>Địa chỉ:</p>
            </div>
            <div style={informationStyle}>
                <p style={{position: 'absolute', margin: 0, top: '10%'}}>0</p>
                <p style={{position: 'absolute', margin: 0, top: '25%'}}>Nguyễn Văn A</p>
                <input className='custom-input' placeholder={'0123456789'} style={{height: '8%', top: '39%', ...inputStyle}}/>
                <textarea className='custom-input' placeholder={example_address} style={{ resize: 'none', height: '30%', top: '55%', ...inputStyle}}/>
            </div>
        </div>
    );
}

export default CustomerInformation;