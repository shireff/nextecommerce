"use client";
import React from 'react'
import Image from 'next/image'
export default function ProductBunner({product}) {
    // console.log(product.attributes.img.data.attributes.url);
  return (
    <div>
        <Image 
            style={{height:"100%"}}
            src={product.attributes.img.data.attributes.url}
            alt='Product-details-bunner'
            width={400}
            height={400}
            className='rounded-lg'
        />
    </div>
  )
}
