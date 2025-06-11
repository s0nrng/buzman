import React from 'react';
import ModeButton from './ModeButton';

function OrderModeBar({orderMode, setOrderMode}){
    const mainStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: '6%',
        width: '40%',
        marginLeft: '3%',
        borderRadius: 20,
        paddingLeft: '0.5%',
        paddingRight: '0.5%',
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
    }

    

    return (
        <div style={mainStyle}>
            <ModeButton name={"Đơn Mới"} mode={'new_order'} orderMode={orderMode} setOrderMode={setOrderMode}/>
            <ModeButton name={"Đã Lên"} mode={'made_order'} orderMode={orderMode} setOrderMode={setOrderMode}/>
            <ModeButton name={"Đã Đóng"} mode={'packed_order'} orderMode={orderMode} setOrderMode={setOrderMode}/>
            <ModeButton name={"Hoàn Thành"} mode={'finish_order'} orderMode={orderMode} setOrderMode={setOrderMode}/>
        </div>
    );
}

export default OrderModeBar;