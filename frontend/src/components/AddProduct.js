import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const navigate=useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            let result = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            result = await result.json();
            console.warn(result);
            navigate("/")
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>*Enter valid name</span>}
            
            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Price'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>*Enter valid price</span>}

            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Category'
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>*Enter valid category</span>}

            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Company'
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>*Enter valid company</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;
