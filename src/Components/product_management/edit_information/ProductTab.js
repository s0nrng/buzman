import React from 'react';
import ProductInformation from './ProductInformation';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';

export default function ProductTab({
    mode,
    product,
    setMode,
    setProduct,
    name,
    setName,
    price,
    setPrice,
    pricePerUnit,
    setPricePerUnit}){

    const mainStyle = {
        position: 'relative',
        // backgroundColor: 'gray',
        width: '35%',
        height: '100%',
        marginRight: '3%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
    const buttonStyle = {
        position: 'relative',
        marginTop: '1%',
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    // console.log(customer)
    return(
        <div style={mainStyle}>
            <ProductInformation
                mode={mode} 
                product={product}
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                pricePerUnit={pricePerUnit}
                setPricePerUnit={setPricePerUnit}/>
            <div style={buttonStyle}>
                {mode==='edit'&&<CancelButton setMode={setMode} setProduct={setProduct} setName={setName} setPrice={setPrice} setPricePerUnit={setPricePerUnit}/>}
                <ConfirmButton mode={mode} setMode={setMode} name={name} setName={setName} price={price} setPrice={setPrice} pricePerUnit={pricePerUnit} setPricePerUnit={setPricePerUnit} product={product}/>
            </div>
        </div>
    )
}