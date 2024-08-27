import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

    }
    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company}),
            headers: {
                "Content-type": "Application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        if(result)
        {
            navigate('/')
        }
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            
            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Price'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />

            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Category'
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />

            <input
                className='inputBox'
                type="text"
                placeholder='Enter Product Company'
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
            />

            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
