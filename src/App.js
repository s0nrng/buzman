import './App.css';
import React, {useState} from 'react';
import OrderManagementTab from './Components/order_management/OrderManagementTab';
import ModeButtonPanel from './Components/mode_button_panel/ModeButtonPanel';
import CustomerManagementTab from './Components/customer_management/CustomerManagementTab';
import ProductManagementTab from './Components/product_management/ProductManagementTab';

function App() {
  const backgroundStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'Gainsboro'
  }
  const mainStyle = {
    position: 'absolute',
    width: '90vw',
    aspectRatio: '16 / 9', // or 0.5625
    transform: "translate(-50%)",
    left: '50vw',
    top: '5vh',
    maxHeight: '90vh',
    maxWidth: '160vh',
    width: 'min(90vw, 160vh)',
    minWidth: 800,
    minHeight: 450,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.2)',
    fontSize:'clamp(8px, 2vmin, 32px)',
    display: 'flex', // optional,
  };
  const childStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',
    // backgroundColor: 'gray'
  }
  const [appState, setAppState] = useState('order');
  return (
    <div style={backgroundStyle}>
      <div className='container' style={mainStyle}>
        <div style={childStyle}>
        {appState==='order'&& <OrderManagementTab/>}
        {appState==='customer'&& <CustomerManagementTab/>}
        {appState==='product'&& <ProductManagementTab/>}
        </div>
      </div>
      <ModeButtonPanel setAppState={setAppState} appState={appState}/>
    </div>
  );
}

export default App;
