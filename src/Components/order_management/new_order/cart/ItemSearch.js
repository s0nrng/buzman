import React, {useState} from 'react';
import { MdAdd } from 'react-icons/md';

function ItemSearch( {products, setProducts} ){
    const [suggestions, setSuggestions] = useState([])
    const [name, setName] = useState('')
    const [query, setQuery] = useState('')
    const [unit, setUnit] = useState('')
    const [noUnit, setNoUnit] = useState(0)

    async function fetchProducts(name){
        if (!name){
            setSuggestions([])
            return
        }
        try{
            const response = await fetch(`http://localhost:4000/products/get?name=${encodeURIComponent(name)}&offset=0&limit=5`);
            if (!response.ok) throw new Error("API error!")
            const data = await response.json()
            setSuggestions(data.slice(0,5))
        } catch(error){
            console.log(error)
            setSuggestions([])
        }
    }

    function handleSelect(product){
        setName(product.Name)
        setQuery(product.Name)
        setSuggestions([])
        setUnit(product.Unit)
    }

    function handleAddProduct(product){
        if (!name || !unit || !noUnit) return
        const addedProducts = [...products]
        addedProducts.push({name, unit, noUnit})
        setProducts(addedProducts) 
        setSuggestions([])
        setName('')
        setQuery('')
        setUnit('')
        setNoUnit(0)
    }

    function handleChange(e){
        const val = e.target.value
        setQuery(val)
        if (val===''){
            setSuggestions([])
            return
        }
        fetchProducts(val)
    }

    // Only allow digits and at most one decimal point
    const handleUnitChange = (e) => {
        const input = e.target.value
        if (input === '' || /^[0-9]*\.?[0-9]*$/.test(input)) {
        setNoUnit(input)
        }
    }

    const mainStyle = {
        height: '50%',
        width: '100%',
        backgroundColor: 'transparent',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: 'hidden',
        paddingLeft:'2%',
        paddingRight: '2%',
        boxSizing: 'border-box',
    }

    const frameStyle={
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
        // border: '1px solid black'
    }

    const ulStyle = {
        position: 'absolute',
        width: '60%',
        // height: '250%',
        top: '91%',
        left: '8%',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        marginLeft: 0,
        zIndex: 9999,
        borderRadius: 5,
        boxShadow: '0px 0px 10px 0.3px rgba(0, 0, 0, 0.2)',
        listStyleType: 'none',
        padding: 0,
        fontSize: '1.1em',
    }

    const liStyle = {
        paddingLeft: '4%',
        paddingRight: '4%',
        height: '100%',
        marginTop: 2.5,
        marginBottom: 2.5,
        borderRadius: 5
    }
    
    return(
        <div style={mainStyle}>
            <div style={frameStyle}>
                <div style={{ textAlign: 'center', width: '6%', ...cellStyle }}>0</div>
                <input
                    className='custom-input'
                    placeholder='Tên sản phẩm...'
                    value={query}
                    onChange={handleChange}
                    style={{ paddingLeft: '1rem', paddingRight: '1rem', width: '60%', ...cellStyle }}></input>
                <div style={{ textAlign: 'center', textAlign: 'center', width: '20%', ...cellStyle }}>{unit}</div>
                <input
                    className='custom-input'
                    placeholder='0'
                    value= {noUnit === 0 ? '' : noUnit}
                    onChange={handleUnitChange}
                    pattern="[0-9]*"
                    style={{ textAlign: 'center', textAlign: 'center', width: '5%', ...cellStyle }}
                    type="text" 
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) => {
                        // prevent scientific notation and other invalid chars
                        if (['e', 'E', '+', '-'].includes(e.key)) {
                          e.preventDefault();
                        }
                    }}
                    ></input>
                    <div
                        style={{width: '9%', justifyContent: 'center', ...cellStyle}}>
                            <MdAdd 
                                className='button'
                                style={{size: '150%',color: 'gray'}}
                                onClick={()=>handleAddProduct()}/>
                    </div>
            </div>
            <ul style={ulStyle}>
                {suggestions.map((product =>
                    <li
                        className='li-hover'
                        style={liStyle}
                        key={product.Id}
                        onClick={()=>handleSelect(product)}
                        onMouseDown={(e)=>e.preventDefault()}>
                            {product.Name}
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default ItemSearch;