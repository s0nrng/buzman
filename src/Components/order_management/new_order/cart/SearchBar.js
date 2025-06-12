import React from 'react';
import Header from './Header';
import ItemSearch from './ItemSearch';

function SearchBar(){
    const mainStyle = {
        position: 'relative',
        width: '100%',
        height: '18%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
    }
    return(
        <div style={mainStyle}>
            <Header/>
            <ItemSearch/>
        </div>
    );
}

export default SearchBar;