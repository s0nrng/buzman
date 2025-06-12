import React, {useState} from 'react';

function ItemSearch(){
    const [value, setValue] = useState('');

    const [nameChosen, setNameChosen] = useState('');

    // Only allow digits and at most one decimal point
    const handleChange = (e) => {
        const input = e.target.value;
        if (input === '' || /^[0-9]*\.?[0-9]*$/.test(input)) {
        setValue(input);
        }
    };
    const mainStyle = {
        height: '50%',
        width: '100%',
        backgroundColor: 'transparent',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: 'hidden',
        paddingLeft:'1%',
        boxSizing: 'border-box'
    }

    const liStyle={
        backgroundColor: 'transparent',
        color: 'black',
        display: 'flex',
        height: '100%',
    }

    const cellStyle={
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontWeight: 400,
        fontSize: '1.1em',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
    }
    
    return(
        <div style={mainStyle}>
            <div style={liStyle}>
                <div style={{ textAlign: 'center', borderRight: '1px solid lightgray', width: '6%', ...cellStyle }}>0</div>
                <input
                    className='custom-input'
                    placeholder='Tên sản phẩm...'
                    style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px solid lightgray', width: '60%', ...cellStyle }}></input>
                <div style={{ textAlign: 'center', textAlign: 'center',borderRight: '1px solid lightgray', width: '20%', ...cellStyle }}>Cái</div>
                <input
                    className='custom-input'
                    placeholder='0'
                    value={value}
                    onChange={handleChange}
                    pattern="[0-9]*"
                    style={{ textAlign: 'center', textAlign: 'center', borderRight: '1px solid lightgray', width: '5%', ...cellStyle }}
                    type="text" 
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) => {
                        // prevent scientific notation and other invalid chars
                        if (['e', 'E', '+', '-'].includes(e.key)) {
                          e.preventDefault();
                        }
                    }}
                    ></input>
            </div>
        </div>

    );
}

export default ItemSearch;