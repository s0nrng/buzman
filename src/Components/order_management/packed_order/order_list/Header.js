import React from "react";

function Header(){
    const mainStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        width: '90%',
        height: '7%',
        // backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '2%',
        borderBottom: '2px solid gray'
    }

    const cellStyle = {
        position: 'relative',
        display: 'flex',
        boxSizing: 'bordder-box',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: '1.1em',
        fontWeight: 800,
        color: 'black'
    }
    return (
        <div style={mainStyle}>
            <div style={{width: '10%', justifyContent: 'center', ...cellStyle}}>STT</div>
            <div style={{width: '24%', justifyContent: 'center', marginLeft:'2%', ...cellStyle}}>Mã đơn hàng</div>
            <div style={{width: '54%', justifyContent: 'center', ...cellStyle}}>Thời gian lên đơn</div>
        </div>
    )
}

export default Header;