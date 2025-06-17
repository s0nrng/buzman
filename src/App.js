import './App.css';
import React, {useState} from 'react';
import OrderManagementTab from './Components/order_management/OrderManagementTab';

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
    fontSize:'2vmin',
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
      </div>
    </div>
    </div>
  );
}

export default App;
