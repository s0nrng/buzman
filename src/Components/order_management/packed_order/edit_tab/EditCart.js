import React, {useEffect} from "react";
import Header from "./Header";
import Content from "./Content";

function EditCart({products, setProducts}){
    const mainStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '67%',
        marginBottom: '5%',
        borderRadius: 10,
        // boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        
    }
    useEffect(()=>{
        console.log(products)
    }, [products])
    return (
        <div style={mainStyle}>
            <Header/>
            <Content products={products} setProducts={setProducts}/>
        </div>
    )
}

export default EditCart;