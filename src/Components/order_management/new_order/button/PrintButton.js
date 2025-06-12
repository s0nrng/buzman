import React, { useState } from 'react';
import { FiPrinter } from 'react-icons/fi';

function PrintButton(){
    const [hovered, setHovered] = useState(false)
    const mainStyle = {
        backgroundColor: hovered ? 'white' : 'black',
        position: 'relative',
        display:'flex',
        width: '29%',
        height: '100%',
        borderRadius: 15,
        color: hovered ? 'black' : 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '1.2em',
        boxSizing: 'border-box',
        border: hovered ? '1px solid black' : 'none',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
    }
    return(
        <div
            className='button'
            style={mainStyle}
            onMouseEnter={() => {setHovered(true)}}
            onMouseLeave={() => {setHovered(false)}}>
                <FiPrinter size={'50%'}/>
        </div>
    );
}

export default PrintButton;