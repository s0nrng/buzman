import React,{useState, useEffect} from 'react';
import OrderListTab from './order_list/OrderListTab';
import EditTab from './edit_tab/EditTab';

function FinishedOrderTab(){
    const mainStyle = {
        marginTop: '1%',
        width: '100%',
        height: '70%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        // backgroundColor: 'gray',
        boxSizing: 'border-box',
    }

    const [editMode, setEditMode] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [customer, setCustomer] = useState('')
    const [products, setProducts] = useState([])
    


    return (
        <div style={mainStyle}>
            <OrderListTab setEditMode={setEditMode} setSelectedOrder={setSelectedOrder} setCustomer={setCustomer} setProducts={setProducts} products={products}/>
            {editMode&&
            <EditTab customer={customer} setCustomer={setCustomer} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} products={products} setProducts={setProducts} setEditMode={setEditMode}/>
            }
        </div>
    )
}

export default FinishedOrderTab;