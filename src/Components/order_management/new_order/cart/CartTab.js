import React from 'react';
import SearchBar from './SearchBar';

function CartTab(){
    const mainStyle = {
        position: 'relative',
        height: '100%',
        width: '58%',
        marginLeft: '3%',
        display: 'flex',
        flexDirection: 'column'
    }
    return(
        <div style={mainStyle}>
            <SearchBar/>
        </div>
    );
}

export default CartTab;