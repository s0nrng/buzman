import React, {useState} from 'react';
import SearchBar from './SearchBar';
import CartContent from './CartContent';



function CartTab({products, setProducts}){
    const mainStyle = {
        position: 'relative',
        height: '100%',
        width: '58%',
        marginLeft: '3%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }


    return(
        <div style={mainStyle}>
            <SearchBar products={products} setProducts={setProducts}/>
            <CartContent products={products} setProducts={setProducts}/>
        </div>
    );
}

export default CartTab;