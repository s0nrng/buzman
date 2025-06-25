import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaCube } from 'react-icons/fa';

function ModeButton({mode, appState, setAppState}){
    const mainStyle = {
        width: '100%',
        aspectRatio: '1',
        backgroundColor: mode === appState ? 'white' : 'black',
        border: 'none',
        outline: 'none',
        // border: mode === appState ? '2px solid black' : 'none',
        borderRadius: 10,
        color: mode === appState ? 'black' : 'white',
        boxSizing: 'border-box',
        boxShadow:'0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        fontSize: '2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }   
    return(
        <button
            className='button'
            onClick={()=>setAppState(mode)}
            style={mainStyle}>
                {mode === 'order' && <FaShoppingCart/>}
                {mode === 'customer' && <FaUser/>}
                {mode === 'product' && <FaCube/>}
        </button>

    )
}

export default ModeButton;