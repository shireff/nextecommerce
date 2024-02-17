// "use client";
import { useUser } from '@clerk/nextjs';
import Loading from '/app/_components/Loading'
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import React, {useContext} from 'react'
import { useRouter } from 'next/navigation';
import cardApi from '/app/_utilis/cardApi';
import { CardContext } from '/app/_context/CardContext';

export default function ProductInfo({ product }) {
  const {user} = useUser()
  const router = useRouter()
  const {cart, setCart} = useContext(CardContext)

  const addToCard = () => {
    if(!user) {
      router.push("/sign-in")
    } else {
      
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product.id],
        },
      };

      cardApi.addToCard(data).then(res =>{
        console.log("card created");
        setCart(oldCart =>[
          ...oldCart, 
          {
            id: res.data.data.id,
            product
          }
        ])
      }) .catch (error => {
        console.log("error", error);
      })
    }
  }
  return (
    <div>
      {product.id ?  
      
      <div>
        <h2 className='text-[20px]'>
            {product.attributes.title}
        </h2>
        <h2 className='text-[15px] text-gray-400'>
            {product.attributes.categ}
        </h2>
        <h2 className='text-[11px] mt-3'>
            {product.attributes.description[0].children[0].text}
        </h2>
        {/* <h2>{}</h2> */}
        <h2 className='text-[11px] text-gray-500 flex gap-2 mt-2 items-center'> {
          product.attributes.instantDelivery? <BadgeCheck className='text-green-500 w-5 h-5'/> : <AlertOctagon className='text-red-500 w-5 h-5'/>
        } Eligible For Instant Delivery</h2>
        <h2 className='text-[32px] text-primary mt-3'>
           Price: {product.attributes.price}$
        </h2>
        <button onClick={()=>addToCard()} className='flex gap-2 rounded-lg bg-primary hover:bg-teal-600 p-3 text-white'><ShoppingCart/> Add To Card</button>
    </div>
      
      :
      <Loading />
      
      }
    </div>
  )
}
