"use client";
import BreadCrumb from "/app/_components/BreadCrumb";
import ProductApi from "/app/_utilis/ProductApi";
import React, { useEffect, useState } from "react";
import ProductBunner from "../_components/ProductBunner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "/app/_components/ProductList";
import { usePathname } from "next/navigation";
import Loading from "/app/_components/Loading";

export default function ProductDetails({ params }) {
  // const [productDe, setProductDe] = useState({})
  // const getProductsByID_ = ()=>{
  //   ProductApi.getProductsByID(params.productId).then(res=>{
  //     console.log("product item", res.data.data);
  //     setProductDe(res.data.data)
  //   })
  // }


  const [productDe, setProductDe] = useState(null); // Set initial state to null
  const [productList, setProductList] = useState([])
  const path = usePathname()

  const getProductsByID_ = () => {
    ProductApi.getProductsByID(params.productId)
      .then((res) => {
        console.log("product item", res.data.data);
        setProductDe(res.data.data);
        getProductByCateg(res.data.data)
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        // Handle error (e.g., display a message to the user)
      });
  };

  const getProductByCateg = (product) => {
    ProductApi.getProductByCateg(product.attributes.categ).then(res=>{
      console.log(res.data.data);
      setProductList(res.data.data)
    })
  }

  // const getProductsByID_ = async () => {
  //   try {
  //     const response = await ProductApi.getProductsByID(params.productId);
  //     console.log("Product item:", response.data.data);
  //     setProductDe(response.data.data);
  //     await getProductByCateg_(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching product details:", error);
  //     // Handle error (e.g., display a message to the user)
  //   }
  // };
  
  // const getProductByCateg_ = async (product) => {
  //   try {
  //     const response = await ProductApi.getProductByCateg(product.attributes.categ);
  //     console.log("Products by category:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching products by category:", error);
  //     // Handle error (e.g., display a message to the user)
  //   }
  // };

  useEffect(() => {
    getProductsByID_();
  }, [params.productId]);
  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path}/>
      <div className="grid grid-col-1 gap-5 sm:gap-0  sm:grid-cols-2 justify-around mt-10">
        {productDe ? (
          <>
            <ProductBunner product={productDe} />
            <ProductInfo product={productDe} />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div>
        <h2 className="mt-24 text-xl">Similar Products</h2>
        <ProductList product={productList}/>
      </div>
    </div>
  );
}
