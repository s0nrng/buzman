import React from "react";

function Header(){
    const mainStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        // alignItem: 'flex-end',
        justifyContent: 'flex-end',
        height: '15%',
        width: '100%',
    }

    const textStyle = {
        fontSize: '3em',
        fontWeight: 600,
        margin: 0,
        marginLeft: '5%',
        marginBottom: '1%'
    }
    return (
        <div style={mainStyle}>
            <p className="text" style={textStyle}>Quản lý sản phẩm</p>
        </div>
    );
}

export default Header;