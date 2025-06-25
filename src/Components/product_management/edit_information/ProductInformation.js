import React, { useState, useEffect } from 'react';

export default function ProductInformation({mode, product, name, setName, price, setPrice, pricePerUnit, setPricePerUnit}){
    const fontSize='1.1em'
    
    const mainStyle = {
        position: 'relative',
        backgroundColor: 'white',
        height: '89%',
        width: '100%',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        alignItems: 'center',
    }
    const headerStyle = {
        display: 'flex',
        position: 'relative',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: '7%',
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        fontSize: '2em',
        fontWeight: 600
    }

    const labelSectionStyle = {
        position: 'relative',
        width: '80%',
        height: '70%',
        marginTop: '5%',
        display: 'flex',
        overflowY: 'auto',
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
    }

    const informationSectionStyle = {
        position: 'absolute',
        left: '40%',
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: fontSize
    }

    const labelStyle = {
        position: 'absolute',
        width: '40%',
        height: '100%',
        // backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 600,
        fontSize: fontSize
    }

    const inputStyle = {
        position: 'relative',
        width: '90%',
        height: '10%',
        padding: 0,
        outline: 'none',
        border: 'none',
        outline: 'none',
        borderBottom: '1px solid lightgray',
        boxSizing: 'border-box',
        fontSize: fontSize
    }

    const textStyle={
        position:'absolute',
        marginTop: '22%',
    }
    
    useEffect(()=>{
        if (product){
            setName(product.Name);
            setPrice(product.Price);
            setPricePerUnit(product.PricePerUnit);
        }
    },[product])
    return(
        <div style={mainStyle}>
            <div style={headerStyle}>Thông tin sản phẩm</div>
            <div style={labelSectionStyle}>
                <div style={labelStyle}>
                    <p style={{position: 'absolute', margin: 0, top: '15%'}}>Mã sản phẩm:</p>
                    <p style={{position: 'absolute', margin: 0, top: '33%'}}>Tên sản phẩm:</p>
                    <p style={{position: 'absolute', margin: 0, top: '51%'}}>Giá:</p>
                    <p style={{position: 'absolute', margin: 0, top: '69%'}}>Giá/đơn vị:</p>
                </div>
                <div style={informationSectionStyle}>
                    {mode==='edit'&&<p style={textStyle}>{product.Id}</p>}
                    <input style={{...inputStyle, top: '31%'}} value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input style={{...inputStyle, top: '39%'}} value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    <input style={{...inputStyle, top: '49%'}} value={pricePerUnit} onChange={(e)=>setPricePerUnit(e.target.value)}/>
                </div>
            </div>
            
        </div>
    )
}