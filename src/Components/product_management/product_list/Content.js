import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

export default function Content({productList, setProductList, searchMode, setMode, setProduct}){
    async function fetchProductsDesc(offset = 0, limit = 10) {
        try {
            const response = await axios.get(`http://localhost:4000/products/get_desc`, {
                params: {
                    offset: offset,
                    limit: limit
                }
            });
            // console.log('Customers with descending ID:', response.data);
            setProductList(response.data);
        } catch(error) {
            console.log('Error fetching products with descending ID:', error);
            return [];
        }
    }

    useEffect(() => {
        if (searchMode) return;
        fetchProductsDesc();
        const interval = setInterval(fetchProductsDesc, 300);
        return () => clearInterval(interval);
    }, [searchMode]);

    const mainStyle = {
        position: 'relative',
        width: '100%',
        height: '87%',
        marginBottom: '2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'gray',
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
        padding: 0,
        alignItems: 'center',
    }

    const liStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        width: '93%',
        height: '9%',
        display: 'flex',
        flexDirection: 'row',
        color:'black',
        borderBottom: '1px solid lightgray',
        alignItems:'center'
    }

    const cellStyle = {
        height: '100%',
        display: 'flex',
        fontSize: '1.1em',
        alignItems: 'center',
        fontWeight: 400,
        color: 'black',
        boxSizing: 'border-box',
    }

    function handleClick(product){
        console.log(product)
        setProduct(product);
        setMode('edit');
    }

    return(
        <div style={mainStyle}>
            <Header/>
            <ul style={ulStyle}>
                {productList.map((product) => (
                    <li className='li-hover' style={liStyle} key={product.Id} onClick={()=>handleClick(product)}>
                        <p style={{width: '20%', justifyContent: 'center', ...cellStyle}}>{product.Id}</p>
                        <p style={{width: '50%', marginLeft: '2%', justifyContent: 'left', ...cellStyle}}>{product.Name}</p>
                        <p style={{width: '30%', justifyContent: 'center', ...cellStyle}}>{product.Price}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}