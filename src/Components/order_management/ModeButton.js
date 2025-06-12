import React, {useState} from 'react';

function ModeButton({name, mode, orderMode, setOrderMode}){
    const [hovered, setHovered] = useState(false);
    const mainStyle={
        backgroundColor: orderMode===mode ? 'black' : hovered ? 'lightgray' : 'transparent',
        height: '80%',
        width: '24%',
        borderRadius: 25,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '1.1em',
        color: orderMode===mode ? 'white' : 'black'
    }

    return (
        <div
        className='button'
        style={mainStyle}
        onClick={()=>{setOrderMode(mode)}}
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}>
            <p className='text'>{name}</p>
        </div>
    );
}

export default ModeButton;