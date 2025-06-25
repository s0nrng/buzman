import React, {useState} from 'react';
import Header from './edit_information/Header';
import ProductTab from './edit_information/ProductTab';
import ProductList from './product_list/ProductList';

function CustomerManagementTab(){
    const mainStyle = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    }

    const overallStyle = {
        position: 'relative',
        width: '100%',
        marginTop: '4.4%',
        height: '70%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        // backgroundColor: 'gray',
    }

    const [mode, setMode] = useState('new');
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState(null);
    const [searchMode, setSearchMode] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    // console.log(mode)
    // console.log(customer)

    return(
        <div style={mainStyle}>
            <Header/>
            <div style={overallStyle}> 
                <ProductTab mode={mode} product={product} setMode={setMode} setProduct={setProduct} name={name} setName={setName} price={price} setPrice={setPrice} pricePerUnit={pricePerUnit} setPricePerUnit={setPricePerUnit}/>
                <ProductList
                    setMode={setMode}
                    productList={productList}
                    setProductList={setProductList}
                    searchMode={searchMode}
                    setSearchMode={setSearchMode}
                    setProduct={setProduct}/>
            </div>
        </div>
    )
}

export default CustomerManagementTab;