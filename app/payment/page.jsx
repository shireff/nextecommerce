"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function PaymentConfirm() {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4">
      <Image src={"/verified.gif"} alt="check" width={130} height={130} />
      <h2 className="text-[24px]">Payment Successful !</h2>
      <h2 className="text-[17px] text-center mt-6 text-gray-500">
        we send an email with your order confirmation along with digital content
      </h2>
      <Link className="p-2 mt-6 text-white rounded-md bg-primary" href={"/"}>
        Go To Home
      </Link>
    </div>
  );
}
