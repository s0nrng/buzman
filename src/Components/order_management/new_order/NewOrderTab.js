import React, { useState, useEffect } from 'react';
import CustomerTab from './customer/CustomerTab';
import CartTab from './cart/CartTab';
import ConfirmButton from './button/ConfirmButton';
import PrintButton from './button/PrintButton';

function NewOrderTab(){
    const mainStyle = {
        marginTop: '1%',
        width: '100%',
        height: '70%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        // backgroundColor: 'gray'
    }

    const rightStyle = {
        position: 'relative',
        backgroundColor: 'transparent',
        height: '100%',
        marginRight:'3%',
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
    
    const buttonPanelStyle = {
        position: 'relative',
        height: '9%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

    const [customer, setCustomer] = useState(null)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [products, setProducts] = useState([])
    const [clickable, setClickable] = useState(false)

    useEffect(()=>{
        // console.log({ customer, phone, address, products });
        if (!customer || !phone || !address || products.length === 0){
            setClickable(false)
            return
        }
        setClickable(true);
    }, [customer, phone, address, products])

    return (
        <div style={mainStyle}>
            <div style={rightStyle}>
                <CustomerTab
                    customer={customer}
                    setCustomer={setCustomer}
                    phone={phone}
                    setPhone={setPhone}
                    address={address}
                    setAddress={setAddress}
                />
                <div style={buttonPanelStyle}>
                    {/* <PrintButton/> */}
                    <ConfirmButton customer={customer} setCustomer={setCustomer} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress} products={products} setProducts={setProducts} clickable={clickable}/>
                </div>
            </div>
            <CartTab customer={customer} setCustomer={setCustomer} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress} products={products} setProducts={setProducts} />
        </div>
    )
}

export default NewOrderTab