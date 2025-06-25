import React from "react";

function Header(){
    const mainStyle = {
        height: '10%',
        width: '100%',
        backgroundColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft:'2%',
        paddingRight: '2%',
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
        fontSize: '1.1em',
        boxSizing: 'border-box',
        // border: '1px solid white'
    }
    
    return(
        <div style={mainStyle}>
            <div style={rowStyle}>
                <div style={{ width: '6%', ...cellStyle }}>STT</div>
                <div style={{ width: '53%', ...cellStyle }}>Tên sản phẩm</div>
                <div style={{ width: '20%', ...cellStyle }}>Đơn vị</div>
                <div style={{ width: '6%', ...cellStyle }}>YC</div>
                <div style={{ width: '6%', ...cellStyle }}>TC</div>
            </div>
        </div>

    );
}

export default Header