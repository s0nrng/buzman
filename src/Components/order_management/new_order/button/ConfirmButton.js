import React, { useState } from 'react';

function ConfirmButton(){
    const [hovered, setHovered] = useState(false)
    const mainStyle = {
        backgroundColor: hovered ? 'white' : 'black',
        position: 'relative',
        display:'flex',
        width: '69%',
        height: '100%',
        borderRadius: 5,
        color: hovered ? 'black' : 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '1.2em',
        boxSizing: 'border-box',
        border: hovered ? '1px solid black' : 'none'
    }
    return(
        <div
            className='button'
            style={mainStyle}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}>
            Lên đơn
        </div>
    );
}

export default ConfirmButton;