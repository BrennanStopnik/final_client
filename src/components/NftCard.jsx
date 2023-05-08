import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";
const NftCard = (props) => {
  const { nft, urlEndPoint } = props;
  const auth = useAuth();

  const pushToCart = async (pickedNft) => {
    const cartCheck = auth.userCart.filter((item) => {
      return item.id === pickedNft.id;
    });
    if (cartCheck.length === 0) {
      console.log("push to cart db");
      const result = await fetch(`${urlEndPoint}/users/update-cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: auth.userEmail,
          cart: pickedNft,
        }),
      });
      const payload = await result.json();
      if (payload) {
        auth.setShouldRefresh(true);
      }
    }
  };
  console.log(nft.owner);
  return (
    <div className="relative duration-75 transform hover:scale-105 flex flex-col shadow-2xl shadow-slate-800 rounded-xl text-center  bg-zinc-600 dark:bg-zinc-800 text-white w-[285px] ">
      <div>
        <img
          src={nft.image_original_url ? nft.image_original_url : nft.image_url}
          alt="/"
          className=" rounded-xl w-[285px] display-block"
        />
      </div>
      <div className="">
        <h3 className="font-bold text-lg">{nft.name}</h3>
        <h3 className="font-bold text-lg">{nft.collection.name}</h3>
        <p className="text-lg pt-2 pb-4 px-2 text-left flex justify-between">
          {!nft.owner ? nft.coin : "Not for sale"}
          <button
            onClick={() => {
              pushToCart(nft);
            }}
            className=" px-2 bg-transparent  hover:bg-indigo-500 dark:bg-indigo-700/50 dark:hover:bg-indigo-500 hover:text-white"
          >
            Add to Cart
          </button>
        </p>
        <p className="text-lg pt-2 pb-4 px-2 text-center text-zinc-400 flex justify-between">
          Last sale: 350$
          <button className=" px-2 bg-transparent  hover:bg-indigo-500 dark:bg-indigo-700/50 dark:hover:bg-indigo-500 hover:text-white">
            Details
          </button>
        </p>
      </div>
    </div>
  );
};

export default NftCard;
