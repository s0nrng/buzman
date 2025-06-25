import React from 'react';
import axios from 'axios';

export default function ConfirmButton({mode, setMode, name, setName, price, setPrice, pricePerUnit, setPricePerUnit, product}){
    const mainStyle = {
        position: 'relative',
        width: mode==='new'?'100%':'84%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        color: 'white',
        fontSize: '1.2em',
        fontWeight: 600,
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
    }

    async function CreateCustomer() {
        if (!name.trim() || !price.trim() || !pricePerUnit.trim()) {
            alert('Please fill in all required fields');
            return false;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/products/create', {
                name: name.trim(),
                price: price.trim(),
                pricePerUnit: pricePerUnit.trim()
            });
            alert('Tạo sản phẩm mới thành công!');
            console.log('Created:', response.data);
            return true;
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('Network error. Please try again.');
            }
            console.error('Error:', error);
            return false;
        }
    }
    
    async function UpdateCustomer() {
        if (!name.trim() || !price.trim() || !pricePerUnit.trim()) {
            alert('Please fill in all required fields');
            return false;
        }
    
        if (!product?.Id) {
            alert('No product selected for update');
            return false;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/products/update', {
                id: product.Id,
                name: name.trim(),
                price: price.trim(),
                pricePerUnit: pricePerUnit.trim()
            });
            alert('Cập nhật thông tin sản phẩm thành công!');
            console.log('Updated:', response.data);
            return true;
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('Network error. Please try again.');
            }
            console.error('Error:', error);
            return false;
        }
    }
    

    function handleClick(){
        if (mode==='new'){
            if (CreateCustomer()){
                setMode('new');
                setPrice('');
                setPricePerUnit('');
                setName('');
            }
        }
        else{
            if (UpdateCustomer()){
                setMode('new');
                setPrice('');
                setPricePerUnit('');
                setName('');
            }
        }
    }

    return(
        <button style={mainStyle} onClick={handleClick} className='button'>
            {mode==='new'?'Thêm sản phẩm':'Lưu thay đổi'}
        </button>
    )
}