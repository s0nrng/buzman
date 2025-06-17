import React from "react";
import { FaSearch } from 'react-icons/fa';



function SearchBar({setSearchMode, setCartContent}){
    async function fetchOrders(orderId){
        if (!orderId){
            return
        }
        try{
            const response = await fetch(`http://localhost:4000/orders/get?index=${encodeURIComponent(orderId)}&offset=0&limit=10`)
            if (!response.ok) throw new Error ("API error!")
            const data = await response.json()
            setCartContent(data.slice(0,10))
        } catch(error){
            console.log(error)
        }
    }


    const mainStyle = {
        width: '100%',
        height: '8%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '2%',
        marginTop: '1%',
        // alignItems: 'flex-end',
        boxSizing: 'border-box',
        alignItems: 'center'
    }

    const iconStyle = {
        position: 'absolute',
        position: 'relative',
        fontSize: '130%',
        color: 'gray',
        marginLeft: '2%',
        marginRight: '1%'
    }

    const textInputStyle = {
        position: 'absolute',
        left: '1%',
        width: '85%',
        height: '90%',
        position: 'relative',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        borderBottom: '1px solid lightgray',
        fontSize: '1.2em',
        boxSizing: 'border-box'
    }
    
    function handleChange(e){
        const value = e.target.value
        if (value===''){
            setSearchMode(false)
            return
        }
        setSearchMode(true)
        fetchOrders(value)
    }

    return (
        <div style={mainStyle}>
            <FaSearch style={iconStyle}/>
            <input
                style = {textInputStyle}
                onChange={(e)=>handleChange(e)}
                placeholder={'Tìm kiếm mã đơn hàng...'}></input>
        </div>
    )
}

export default SearchBar;