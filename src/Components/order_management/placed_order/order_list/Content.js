import React, {useState, useEffect} from 'react';
import axios from 'axios';


function Content({searchMode, cartContent, setCartContent, setEditMode, setSelectedOrder, setCustomer, setProducts}){

    const mainStyle = {
        position: 'relative',
        width: '90%',
        height: '87%',
        // backgroundColor: 'gray',
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const ulStyle = {
        position: 'relative',
        // backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        listStyleType: 'none',
        flexDirection: 'column',
        margin: 0,
        padding: 0
    }

    const liStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        color:'black',
        borderBottom: '1px solid lightgray'

    }

    const cellStyle = {
        position: 'relative',
        display: 'flex',
        boxSizing: 'border',
        height: '100%',
        alignItems: 'center',
        fontSize: '1.1em'
    }

    useEffect(() => {
        if (searchMode) return;
        const fetchOrders = () => {
            axios.get('http://localhost:4000/orders/get_top', {
                params: { offset: 0, limit: 10 }
            })
            .then(res => setCartContent(res.data))
            .catch(err => console.error(err));
        };
    
        // Call immediately and then every 300ms
        fetchOrders();
        const interval = setInterval(fetchOrders, 300);
    
        // Clean up on unmount
        return () => clearInterval(interval);
    }, [searchMode]);

    async function fetchCustomer(customerId){
        try{
            const res = await axios.get('http://localhost:4000/customers/get_by_id', {
                params: {id : customerId}
            })

            return res.data
        } catch (error){
            console.error('Failed to fetch customer: ', error);
            return null
        }
    }

    async function fetchProducts(orderId){
        if (!orderId) return
        try{
            const res = await axios.get('http://localhost:4000/orders/products_by_order', {
                params: {orderId: orderId}
            })
            return res.data
        } catch (error){
            console.error('Failed to fecth products: ', error);
            return []
        }
    }

    async function handleSelect(order){
        setSelectedOrder(order)
        setEditMode(true)
        try{
            const [customer, products] = await Promise.all([
                fetchCustomer(order.Customer),
                fetchProducts(order.Id)
            ])
            setCustomer(customer)
            setProducts(products)
            // console.log(products)
        } catch(error){
            console.error("Error loading order details: ", error)
        }
    }

    return(
        <div style={mainStyle}>
            <ul style={ulStyle}>
                {cartContent.map((order, index) =>(
                    <li className='li-hover' key={order.Id} style={liStyle} onClick={()=>handleSelect(order)}>
                        <div style={{width: '12%', justifyContent:'center', paddingLeft:'2%', ...cellStyle}}>{index+1}</div>
                        <div style={{width: '34%', justifyContent:'center', ...cellStyle}}>#{order.Id}</div>
                        <div style={{width: '54%', justifyContent:'center', ...cellStyle}}>{order.Date}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content;