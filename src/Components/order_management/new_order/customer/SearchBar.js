import React, { useState, useEffect } from 'react';

function SearchBar({setCustomer, phone,setPhone,setAddress}){
    const[query, setQuery] = useState('');
    const[suggestions, setSuggestions] = useState([]);
    async function fetchCustomers(name){
        if (!name){
            setSuggestions([]);
            return;
        }
        try{
            const response = await fetch(`http://localhost:4000/customers/get?name=${encodeURIComponent(name)}&offset=0&limit=5`);
            if (!response.ok) throw new Error("API error!");
            const data = await response.json();
            setSuggestions(data.slice(0, 5));
        } catch(error){
            console.log(error);
            setSuggestions([]);
        }
    }


    function handleSelect(customer){
        setQuery('');
        setSuggestions([]);
        setCustomer(customer);
        setPhone(customer.Phone);
        setAddress(customer.Address);
    }

    // useEffect(() => {
    //     if (customer) {
    //         setPhone(customer.Phone || '');
    //         setAddress(customer.Address || '');
    //     }
    // }, [customer]);
    
    function handleChange(e){
        const val = e.target.value;
        setQuery(val)
        if (val === ''){
            setSuggestions([]);
            return;
        }
        fetchCustomers(val);
    }


    const inputStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 0,
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid lightgray',
        boxSizing: 'border-box',
        paddingLeft: '5%',
        textAlign: 'center',
        fontSize: '1.2em',
        paddingTop: 10,
        // fontStyle: 'italic'
        // backgroundColor: 'gray'
    }

    const mainStyle = {
        position: 'relative',
        width: '70%',
        height: '10%',
    }

    const ulStyle = {
        position: 'absolute',
        width: '100%',
        // height: '500%',
        top: '80%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 2px 3px rgba(0, 0, 0, 0.2)',
        zIndex: 999,
        boxSizing: 'border-box',
        listStyleType: 'none',
        padding: 0,
        borderRadius: 5,
        fontSize: '1.2em'
    }

    const liStyle = {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 2.5,
        marginBottom: 2.5,
        borderRadius: 5,
        // width: 1
    }


    return (
        <div style={mainStyle}>
            <input
            style={inputStyle}
            value={query}
            type='text'
            className='custom-input'
            placeholder='Nhập tên khách hàng'
            onChange={handleChange}/>
            {suggestions.length > 0 &&
            <ul style={ulStyle}>
                {suggestions.map((cust) => 
                <li 
                    className='li-hover'
                    style={liStyle}
                    key={cust.Id}
                    onClick={() => handleSelect(cust)}
                    onMouseDown={(e) => e.preventDefault()}>
                        {cust.Name}
                </li>
                )}
            </ul>}
        </div>   
    )
}

export default SearchBar;