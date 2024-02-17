import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function ProductItem({product}) {
  return (
    <>
    <Link href={`/product-details/${product.id}`} className="p-1 rounded-lg hover:border hover:shadow-md hover:cursor-pointer">
        <Image src={product.attributes.img.data.attributes.url}
        alt="card-img"
        width={400}
        height={350}
        className="rounded-t-lg h-[170px] object-fill"
        
        />
        <div className="flex justify-between p-3 bg-gray-50 rounded-b-lg">
            <div className="">
                <h2 className="text-[14px] font-medium">
                {product.attributes.title}
                </h2>
                <h2 className="text-[10px] text-gray-400">
                {product.attributes.categ}
                </h2>
            </div>
            <div>
            <h2 className="text-[14px] font-medium">
                {product.attributes.price}$
                </h2>
            </div>
        </div>
    </Link>
    </>
  )
}
