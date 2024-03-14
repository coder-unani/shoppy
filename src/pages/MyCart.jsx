import React from "react";
import { getCart } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";

const MyCart = () => {
  const { uid } = useAuthContext();
  const { isLoding, data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });
  const shipping = process.env.REACT_APP_SHIPPING_COST;

  if (isLoding) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송비" price={shipping} />
            <FaEquals />
            <PriceCard text="총 가격" price={totalPrice + shipping} />
          </div>
        </>
      )}
    </section>
  );
};

export default MyCart;
