import React, {useState} from 'react';
import Header from './edit_information/Header';
import CustomerTab from './edit_information/CustomerTab';
import CustomerList from './customer_list/CustomerList';

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
    const [customerList, setCustomerList] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [searchMode, setSearchMode] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    // console.log(mode)
    // console.log(customer)

    return(
        <div style={mainStyle}>
            <Header/>
            <div style={overallStyle}> 
                <CustomerTab mode={mode} customer={customer} setMode={setMode} setCustomer={setCustomer} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress} name={name} setName={setName}/>
                <CustomerList
                    setMode={setMode}
                    customerList={customerList}
                    setCustomerList={setCustomerList}
                    searchMode={searchMode}
                    setSearchMode={setSearchMode}
                    setCustomer={setCustomer}/>
            </div>
        </div>
    )
}

export default CustomerManagementTab;