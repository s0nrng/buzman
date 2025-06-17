import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

function CartContent({products, setProducts}){
    const mainStyle = {
        position: 'relative',
        width: '100%',
        height: '80%',
        display: 'flex',
        marginTop: '2%',
        flexDirection: 'column',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }

    const ulStyle = {
        position: 'relative',
        width: '98%',
        height: '97%',
        padding: 0,
        margin: 0,
        borderRadius: 15,
        listStyleType: 'none',
        paddingLeft: '1%',
        paddingRight: '1%',
        boxSizing: 'border-box',
        overflowX: 'auto',
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
    }

    const liStyle = {
        height: '12%',
        display: 'flex',
        borderBottom: '1px solid lightgray'
    }

    const cellStyle = {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        fontSize: '1.1em',
        outline: 'none',
        border: 'none',
        boxSizing: 'border-box',
        outline: 'none',
        // border: '1px solid black'
    }


    function handleNoUnitChange(e, index){
        const input = e.target.value;
        if (input === '' || /^[0-9]*\.?[0-9]*$/.test(input)) {
            const updatedProducts = [...products]; // create a new array copy
            updatedProducts[index] = { ...updatedProducts[index], noUnit: input };
            setProducts(updatedProducts)
        }
    };



    const [hoveredId, setHoveredId] = useState(null)

    function handleDelete(index){
        const updatedProducts = [...products]
        updatedProducts.splice(index, 1)
        setProducts(updatedProducts)
    }


    return (
        <div style={mainStyle}>
            <style>
                {`
                ul::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>
            <ul style={ulStyle} key={products.length}>
                {products.map((product, index) => (
                    <li key={index} style={liStyle}>
                        <div style={{width: '6%', justifyContent: 'center', ...cellStyle}}>{index + 1}</div>
                        <div style={{width: '60%', textAlign:'left', paddingLeft: '1rem', paddingRight: '1rem', ...cellStyle}}>{product.name}</div>
                        <div style={{width: '20%', justifyContent: 'center', ...cellStyle}}>{product.unit}</div>
                        <input
                        className='custom-input'
                        placeholder='0'
                        value={product.noUnit}
                        onChange={(e) => handleNoUnitChange(e, index)}
                        pattern="[0-9]*"
                        style={{ textAlign: 'center', width: '5%', ...cellStyle }}
                        type="text" 
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) => {
                            // prevent scientific notation and other invalid chars
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                            e.preventDefault();
                            }
                        }}
                        ></input>
                        <div
                            style={{width: '9%', justifyContent: 'center', ...cellStyle}}>
                                <FaTrash
                                    className='button'
                                    style={{color: hoveredId===index ? 'black' : 'gray'}}
                                    onMouseEnter={()=>setHoveredId(index)}
                                    onMouseLeave={()=>setHoveredId(null)}
                                    onClick={()=>handleDelete(index)}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CartContent;