import React from 'react';
import ModeButton from './ModeButton';

function ModeButtonPanel({appState, setAppState}){
    const mainStyle = {
        position: 'absolute',
        bottom: '3vh',
        left: '3vh',
        height: '33%',
        aspectRatio: '0.3',
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    return(
        <div style={mainStyle}>
            <ModeButton mode='order' appState={appState} setAppState={setAppState}/>
            <ModeButton mode='customer' appState={appState} setAppState={setAppState}/>
            <ModeButton mode='product' appState={appState} setAppState={setAppState}/>
        </div>
    )
}

export default ModeButtonPanel;