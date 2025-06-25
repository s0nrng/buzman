import React, { useState,useEffect} from "react";
import { FaTrash } from 'react-icons/fa';

function Content({products, setProducts}){
    const mainStyle={
        position:'relative',
        display: 'flex',
        flexDiretion: 'column',
        // background:'white',
        height: '90%',
        width: '100%',
        border: '1px solid lightgray',
        boxSizing: 'border-box',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTop: 'none',
        paddingLeft: '1%',
        paddingRight: '1%',
    }

    const ulStyle = {
        position: 'relative',
        width: '100%',
        height: '90%',
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        paddingLeft: '1%',
        paddingRight: '1%',
        boxSizing: 'border-box',
        overflowX: 'auto',
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        flexDirection: 'column',
        display:'flex',
    }
    const liStyle = {
        display: 'flex',
        flex: '0 0 12.5%', // flex-grow: 0, flex-shrink: 0, flex-basis: 12.5%
        borderBottom: '1px solid lightgray',
        margin: 0,
        boxSizing: 'border-box', 
        transform: 'translateZ(0)', // Add this line
        WebkitTransform: 'translateZ(0)', // For older Safari/Chrome
        backfaceVisibility: 'hidden', // Can also help in some cases
        WebkitBackfaceVisibility: 'hidden',
    }

    const cellStyle = {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        fontSize: '1em',
        outline: 'none',
        border: 'none',
        boxSizing: 'border-box',
        outline: 'none',
        // border: '1px solid black'
    }

    useEffect(()=>{
        console.log(products)
    }, [products])

    function handleNoUnitChange(e, index){
        const input = e.target.value;
        if (input === '' || /^[0-9]*\.?[0-9]*$/.test(input)) {
            const updatedProducts = [...products]; // create a new array copy
            updatedProducts[index] = { ...updatedProducts[index], NumUnit: input };
            setProducts(updatedProducts)
        }
    };

    function handleNoUnitRequestedChange(e, index){
        const input = e.target.value;
        if (input === '' || /^[0-9]*\.?[0-9]*$/.test(input)) {
            const updatedProducts = [...products]; // create a new array copy
            updatedProducts[index] = { ...updatedProducts[index], NumUnitRequested: input };
            setProducts(updatedProducts)
        }
    };

    const [hoveredId, setHoveredId] = useState(null)

    function handleDelete(index){
        const updatedProducts = [...products]
        updatedProducts.splice(index, 1)
        setProducts(updatedProducts)
    }

    return(
        <div style={mainStyle}>
            <ul style={ulStyle}>
                {products.map((product, index) => (
                    <li key={index} style={liStyle}>
                        <div style={{justifyContent: 'center',width: '6%', ...cellStyle}}>{index+1}</div>
                        <div style={{width: '53%', paddingLeft: '5%', paddingRight: '5%', ...cellStyle}}>{product.ProductName}</div>
                        <div style={{justifyContent: 'center', width: '20%', ...cellStyle}}>{product.Unit}</div>
                        <input
                            style={{justifyContent: 'center', textAlign:'center', width: '6%', ...cellStyle}}
                            className='custom-input'
                            placeholder={0}
                            value={product.NumUnitRequested}
                            onChange={(e)=>handleNoUnitRequestedChange(e, index)}
                            pattern="[0-9]*"
                            type="text"
                            onWheel={(e) => e.target.blur()}
                            onKeyDown={(e) => {
                                // prevent scientific notation and other invalid chars
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                                }}}
                        ></input>
                        {/* <div style={{justifyContent: 'center', width: '6%', ...cellStyle}}>{product.NumUnitRequested}</div> */}
                        <input
                            style={{justifyContent: 'center', textAlign:'center', width: '6%', ...cellStyle}}
                            className='custom-input'
                            placeholder={
                                product.NumUnit === product.NumUnitRequested
                                  ? product.NumUnitRequested
                                  : ''
                            }
                            value={
                                product.NumUnit !== product.NumUnitRequested
                                  ? product.NumUnit
                                  : ''
                            }
                            onChange={(e)=>handleNoUnitChange(e, index)}
                            pattern="[0-9]*"
                            type="text"
                            onWheel={(e) => e.target.blur()}
                            onKeyDown={(e) => {
                                // prevent scientific notation and other invalid chars
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                                }}}
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

export default Content