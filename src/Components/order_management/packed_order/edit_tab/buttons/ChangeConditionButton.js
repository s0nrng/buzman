import React, {useState} from "react";

function ChangeConditionButton( {selectedOrder, setSelectedOrder, products, setProducts, setCustomer, setEditMode} ){
    const [hovered, setHovered] = useState(false)

    async function updateOrderWithOrder(orderToUpdate) {
        if (!orderToUpdate || !orderToUpdate.Id || !Array.isArray(products)) {
            console.error("Invalid order or products input");
            return { success: false, error: "Invalid input" };
        }
    
        try {
            const response = await fetch('http://localhost:4000/orders/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: orderToUpdate, products })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error("Failed to update order:", data.error);
                return { success: false, error: data.error };
            }
    
            console.log("Order updated successfully:", data.message);
            return { success: true, message: data.message };
        } catch (err) {
            console.error("Network or server error:", err.message);
            return { success: false, error: err.message };
        }
    }
    

    async function handleClick(){
        const updatedOrder = { ...selectedOrder, Condition: 'hoàn thành' };
        setSelectedOrder(updatedOrder);

        const res = await updateOrderWithOrder(updatedOrder)
        if (res.success){
            alert("Đã hoàn thành đơn!")
            setProducts([])
            setSelectedOrder(null)
            setCustomer('')
            setEditMode(false)
            return
        }
        else{
            alert("Hoàn thành đơn không thành công, hãy liên lạc hỗ trợ!")
            return
        }
    }

    const mainStyle = {
        position:'relative',
        height: '50%',
        width: '32%',
        outline: 'none',
        backgroundColor: !hovered? 'white' : 'black',
        color: !hovered ? 'black' : 'white',
        border: !hovered ? '1px solid black' : 'none',
        borderRadius: 10,
        fontSize: '0.7em'
    }
    return(
        <button
            className="button"
            style={mainStyle}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            onClick={()=>handleClick()}>
            Hoàn Thành
        </button>
    )
}

export default ChangeConditionButton