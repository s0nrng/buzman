import React, { useState } from 'react';

function SearchBar(){
    const mainStyle = {
        position: 'relative',
        width: '80%',
        height: '10%',
        padding: 0,
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid lightgray',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '1.2em',
        paddingTop: 10,
        // fontStyle: 'italic'
        // backgroundColor: 'gray'
    }
    return (
        <input
        style={mainStyle}
        type='text'
        className='custom-input'
        placeholder='Nhập tên khách hàng'/>
    )
}

export default SearchBar;