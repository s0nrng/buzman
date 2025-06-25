import React, {useState,useEffect} from 'react';
import SearchBar from './SearchBar';
import OrderList from './OrderList';

function OrderListTab({setEditMode, setSelectedOrder, setCustomer, setProducts, products}){
    const mainStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '3%',
        width: '34%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
    }

    const [searchMode, setSearchMode] = useState(false)
    const [cartContent, setCartContent] = useState([])

    // useEffect(()=>{
    //     console.log(products)
    // }, [products])

    return (
        <div style={mainStyle}>
            <SearchBar setSearchMode={setSearchMode} setCartContent={setCartContent}/>
            <OrderList
                setEditMode={setEditMode}
                cartContent={cartContent}
                setCartContent={setCartContent}
                searchMode={searchMode}
                setSelectedOrder={setSelectedOrder}
                setCustomer={setCustomer}
                setProducts={setProducts}
            />
        </div>
    )
}

export default OrderListTab;