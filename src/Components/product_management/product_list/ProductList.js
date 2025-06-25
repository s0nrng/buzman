import React from 'react';
import SearchBar from './SearchBar';
import Content from './Content';

export default function ProductList({
    setMode,
    productList,
    setProductList,
    searchMode, 
    setSearchMode,
    setProduct}){
    const mainStyle = {
        position: 'relative',
        width: '58%',
        marginLeft: '3%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
    }

    return(
        <div style={mainStyle}>
            <SearchBar setMode={setMode} productList={productList} setProductList={setProductList} searchMode={searchMode} setSearchMode={setSearchMode}/>
            <Content productList={productList} searchMode={searchMode} setProductList={setProductList} setMode={setMode} setProduct={setProduct}/>
        </div>
    )
}