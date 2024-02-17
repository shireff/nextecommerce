// import PaymentConfirm from "/app/paymentConfirm/PaymentConfirm";
import { useUser } from "@clerk/nextjs";
import { CardContext } from "/app/_context/CardContext";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import OrderApi from "/app/_utilis/OrderApi";
import cardApi from "/app/_utilis/cardApi";
// import { data } from "autoprefixer";

const CheckoutForm = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const {cart, setCart}= useContext(CardContext)
  const {user} = useUser()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    // create order
    createOrder();

    // send email
    createEmail()

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const createOrder = () => {
    let productId = []
    cart.forEach(e =>{
      productId.push(e.product.id)
    })
    const data = {
      data : {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productId
      }
    }
    OrderApi.createOrder(data).then(res => {
      if(res){
        cart.forEach(e => {
          cardApi.deletCartItem(e.id).then(res =>{})
        })
      }

    })
  }

  const createEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
      // body: JSON.stringify({
      //   amount: amount,
      // }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-12">
        <PaymentElement />
        <button className="bg-primary p-2 mt-4 text-white rounded-md w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
