import React from 'react';

export default function CancelButton({setMode, setCustomer, setPhone, setAddress, setName}){
    const mainStyle = {
        height: '100%',
        width: '15%',
        aspectRatio: '1/1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2em',
        fontWeight: 600,
        color: 'white',
        backgroundColor: 'red',
        border: 'none',
        borderRadius: 10,
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
    }
    function handleClick(){
        setMode('new');
        setCustomer(null);
        setPhone('');
        setAddress('');
        setName('');
    }
    return(
        <button
            style={mainStyle}
            className='button'
            onClick={handleClick}>
                Hủy
        </button>
    )
}