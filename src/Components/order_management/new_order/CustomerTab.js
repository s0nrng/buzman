import React from 'react';
import SearchBar from './SearchBar';

function CustomerTab(){
    const mainStyle = {
        position: 'relative',
        backgroundColor: 'white',
        height: '89%',
        width: '100%',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        alignItems: 'center',
        // fontFamily: 'RedditSans, sans-serif'
    }

    const headerStyle = {
        display: 'flex',
        position: 'relative',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: '10%',
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        fontSize: '1.8em',
        fontWeight: 600
    }

    return (
        <div style={mainStyle}>
            <div style={headerStyle}>Thông tin khách hàng</div>
            <SearchBar/>
        </div>
    );
}

export default CustomerTab;