import React from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

export default function SearchBar({setProductList, setSearchMode}){
    async function fetchProducts(name){
        if (!name){
            return;
        }
        try{
            // const response = await fetch(`http://localhost:4000/customers/get?name=${encodeURIComponent(name)}&offset=0&limit=5`);
            const response = await axios.get(`http://localhost:4000/products/get`, {
                params: {
                    name: encodeURIComponent(name),
                    offset: 0,
                    limit: 5
                }
            });
            console.log(response.data);
            const data = response.data;
            setProductList(data.slice(0, 10));
        } catch(error){
            console.log(error);
        }
    }

    function handleChange(e){
        const value = e.target.value
        if (value===''){
            setSearchMode(false)
            return
        }
        setSearchMode(true)
        fetchProducts(value)
    }

    const mainStyle = {
        display: 'flex',
        position: 'relative',
        width: '93%',
        height: '10%',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
    }
    const inputStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none',
        borderBottom: '1px solid lighgray',
        fontSize: '1.2em',
        justifyContent: 'center',
        borderBottom: '1px solid lightgray',
        paddingLeft: '6%',
        paddingRight: '2%',
    }
    const iconStyle = {
        position: 'absolute',
        left: '0',
        marginLeft: '1%',
        fontSize: '130%',
        color: 'gray',
    }
    return(
        <div style={mainStyle}>
            <input
                style={inputStyle}
                placeholder='Tìm kiếm tên sản phẩm...'
                onChange={handleChange}/>
            
            <FaSearch style={iconStyle} />
        </div>
    )
}