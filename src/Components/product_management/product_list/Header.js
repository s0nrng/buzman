import React from 'react';

export default function Header(){
    const mainStyle = {
        position: 'relative',
        width: '93%',
        height: '10%',
        // backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '2px solid gray',
    }
    const cellStyle = {
        height: '100%',
        display: 'flex',
        fontSize: '1.1em',
        alignItems: 'center',
        fontWeight: 800,
        color: 'black',
        boxSizing: 'border-box',
    }
    return(
        <div style={mainStyle}>
            <p style={{width: '20%', justifyContent: 'center', ...cellStyle}}>Mã sản phẩm</p>
            <p style={{width: '50%', marginLeft: '2%', justifyContent: 'left', ...cellStyle}}>Tên sản phẩm</p>
            <p style={{width: '30%', justifyContent: 'center', ...cellStyle}}>Giá</p>
        </div>
    )
}