import React from "react";

function Content({products}){
    const mainStyle={
        position:'relative',
        display: 'flex',
        flexDirection: 'column',
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
        // backgroundColor: 'blue'
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
    }


    return(
        <div style={mainStyle}>
            <ul style={ulStyle}>
                {products.map((product, index) => (
                    <li key={index} style={liStyle}>
                        <div style={{justifyContent: 'center',width: '6%', ...cellStyle}}>{index+1}</div>
                        <div style={{width: '53%', paddingLeft: '5%', paddingRight: '5%', ...cellStyle}}>{product.ProductName}</div>
                        <div style={{justifyContent: 'center', width: '20%', ...cellStyle}}>{product.Unit}</div>
                        <div style={{justifyContent: 'center', width: '6%', ...cellStyle}}>{product.NumUnitRequested}</div>
                        <div style={{justifyContent: 'center', width: '6%', ...cellStyle}}>{product.NumUnit}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content