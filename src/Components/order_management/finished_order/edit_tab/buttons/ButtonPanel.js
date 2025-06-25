import React from "react";
import PrintButton from "./PrintButton";

function ButtonPanel( {selectedOrder, products, customer} ){
    const mainStyle = {
        position: 'absolute',
        top: '13%',
        left: '61%', 
        width: '33%',
        height: '12%',
        // backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    }
    return(
        <div style={mainStyle}>
            <PrintButton selectedOrder={selectedOrder} products={products} customer={customer}/>
            {/* <SaveButton selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} products={products} setProducts={setProducts} setCustomer={setCustomer} setEditMode={setEditMode}/>
            <ChangeConditionButton  selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} products={products} setProducts={setProducts} setCustomer={setCustomer} setEditMode={setEditMode}/> */}
        </div>
    )
}

export default ButtonPanel