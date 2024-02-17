import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ product }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
      {product.map((item) => (
      <ProductItem key={item.id} product={item}/>
    ))}
    </div>
  )
}
