import React, {useEffect} from "react";
import EditCart from "./EditCart";
import ButtonPanel from "./buttons/ButtonPanel";
function EditTab({selectedOrder, setSelectedOrder, customer, setCustomer, products, setProducts, setEditMode}){
    const mainStyle = {
        position: 'relative',
        width: '59%',
        height: '100%',
        marginRight: '3%',
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '3%',
        paddingRight: '3%',
        boxSizing: 'border-box'
    }

    const headerStyle = {
        position: 'relative',
        width: '100%',
        height: '8%',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '2.5em',
        fontWeight: 500,
        paddingTop: '2%',
    }

    const customerInformationStyle = {
        position: 'relative',
        width: '100%',
        height: '8%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '1em',
        flex:1,
        marginTop: '2%',
        marginLeft: '3%',
        // backgroundColor: 'gray'
    }
    

    return (
        <div style={mainStyle}>
            <div style={headerStyle}>
                Thông tin đơn hàng
            </div>
            <div style={customerInformationStyle}>
                <div style={{fontWeight: 800, position:'relative'}}>
                    <p style={{margin:0}}>Khách hàng: </p>
                    <p style={{margin:0}}>Số điện thoại: </p>
                    <p style={{margin:0}}>Địa chỉ: </p>
                </div>
                <div style={{marginLeft: '2%', position:'relative'}}>
                    <p style={{margin:0}}>{customer.Name}</p>
                    <p style={{margin:0}}>{selectedOrder.Phone}</p>
                    <p style={{margin:0}}>{selectedOrder.Address}</p>
                </div>
            </div>
            <ButtonPanel selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} products={products} setProducts={setProducts} setCustomer={setCustomer} customer={customer} setEditMode={setEditMode}/>
            <EditCart products={products} setProducts={setProducts}/>
        </div>
    )
}

export default EditTab