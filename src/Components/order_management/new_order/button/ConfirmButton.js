import React, { useState, useEffect } from 'react';

function ConfirmButton({customer, phone, address, products, setCustomer, setPhone, setAddress, setProducts, clickable}){
    const [hovered, setHovered] = useState(false)

    async function createNewOrder(customer, address, phone, products){
        const customerId = customer.Id
        const body = JSON.stringify({
            customerId,
            address,
            phone,
            products: products.map(({ id, noUnit }) => ({
                ProductId: id,
                NoUnit: noUnit
            }))
        })
        console.log(body)
        console.log('Products:', products);
        try {
            const response = await fetch('http://localhost:4000/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
            const result = await response.json();
            if (!response.ok) {
                console.error('Server error:', result.error);
                alert('Failed to create order');
            } else {
                console.log('Order created:', result.orderId);
                alert(`Order successfully created! ID: ${result.orderId}`);
            }
            } catch (err) {
                console.error('Network error:', err);
                alert('Network error while creating order');
            }
    }  

    function handleClick(){
        createNewOrder(customer, address, phone, products)
        setCustomer(null)
        setAddress('')
        setPhone('')
        setProducts([])
    }

    const mainStyle = {
        backgroundColor: !clickable ? 'gray' : hovered ? 'white' : 'black',
        position: 'relative',
        display:'flex',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        color: hovered ? 'black' : 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '1.2em',
        boxSizing: 'border-box',
        border: hovered ? '1px solid black' : 'none',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        pointerEvents: clickable ? 'auto' : 'none'  
    }
    return(
        <div
            className='button'
            style={mainStyle}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            onClick={()=>handleClick()}>
            Lên đơn
        </div>
    );
}

export default ConfirmButton;