import React from 'react';

function Header(){
    const mainStyle = {
        height: '50%',
        width: '100%',
        backgroundColor: 'black',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingLeft:'1%',
        boxSizing: 'border-box'
    }

    const rowStyle={
        backgroundColor: 'transparent',
        color: 'white',
        display: 'flex',
        height: '100%'
    }

    const cellStyle={
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        height: '100%',
        fontWeight: 600,
        fontSize: '1.1em'
    }
    
    return(
        <div style={mainStyle}>
            <div style={rowStyle}>
                <div style={{ width: '6%', ...cellStyle }}>STT</div>
                <div style={{ width: '60%', ...cellStyle }}>Tên sản phẩm</div>
                <div style={{ width: '20%', ...cellStyle }}>Đơn vị</div>
                <div style={{ width: '5%', ...cellStyle }}>SL</div>
            </div>
        </div>

    );
}

export default Header;