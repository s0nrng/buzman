import React from 'react';
import axios from 'axios';

export default function ConfirmButton({mode, setMode, phone, setPhone, address, setAddress, name, setName, customer}){
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
        if (!name.trim() || !phone.trim() || !address.trim()) {
            alert('Please fill in all required fields');
            return false;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/customers/create', {
                name: name.trim(),
                phone: phone.trim(),
                address: address.trim()
            });
            alert('Tạo khách hàng mới thành công!');
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
        if (!name.trim() || !phone.trim() || !address.trim()) {
            alert('Please fill in all required fields');
            return false;
        }
    
        if (!customer?.Id) {
            alert('No customer selected for update');
            return false;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/customers/update', {
                id: customer.Id,
                name: name.trim(),
                phone: phone.trim(),
                address: address.trim()
            });
            alert('Cập nhật thông tin khách hàng thành công!');
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
                setPhone('');
                setAddress('');
                setName('');
            }
        }
        else{
            if (UpdateCustomer()){
                setMode('new');
                setPhone('');
                setAddress('');
                setName('');
            }
        }
    }

    return(
        <button style={mainStyle} onClick={handleClick} className='button'>
            {mode==='new'?'Thêm khách hàng':'Lưu thay đổi'}
        </button>
    )
}