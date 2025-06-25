import React, {useState, useRef} from "react";
import axios from "axios";

function PrintButton( {selectedOrder, products, customer} ){
    const [hovered, setHovered] = useState(false)

    const mainStyle = {
        position:'relative',
        height: '50%',
        width: '32%',
        outline: 'none',
        backgroundColor: !hovered? 'white' : 'black',
        color: !hovered ? 'black' : 'white',
        border: !hovered ? '1px solid black' : 'none',
        borderRadius: 10,
        fontSize: '1em'
    }
    
    async function downloadInvoice(products, selectedOrder, customer) {
        const payload = {
            products,
            selectedOrder,
            customer
        };
    
        console.log("Sending invoice payload:", JSON.stringify(payload, null, 2)); // ✅ log the full object
    
        try {
            const response = await axios.post('http://localhost:4000/api/generate-invoice-for-package', {
                products,
                selectedOrder,
                customer
            }, {
                responseType: 'blob'
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `#${selectedOrder.Id || 'unknown'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Download failed:', err);
        }
    }
    
    return(
        <button
            className="button"
            style={mainStyle}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            onClick={()=>downloadInvoice(products, selectedOrder, customer)}>
            In
        </button>
    )
}

export default PrintButton