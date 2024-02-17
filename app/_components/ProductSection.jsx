"use client"
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApi from '../_utilis/ProductApi'
// import { useState } from 'react/cjs/react.production.min'
// import axios from 'axios'
export default function ProductSection() {
    const [productList, setProductList] = useState([])
    
    const getProducts_ = () => {
        ProductApi.getProducts().then(res=> {
            console.log(res.data.data);
            
            setProductList(res.data.data)
        })
    }

    useEffect(()=>{
        getProducts_()
    },[])
    
  return (
    <div className="px-10 md:px-20">
        <h1 className="my-4 text-xl">Latest Products</h1>
        <ProductList product={productList}/>
    </div>
  )
}
