import React from "react";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import Button from "../components/ui/Button";
import useCarts from "../hooks/useCarts";

const MyCart = () => {
  const {
    cartsQuery: { isLoading, data: products },
  } = useCarts();

  const shipping = process.env.REACT_APP_SHIPPING_COST;

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 brder-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송비" price={shipping} />
            <FaEquals className="shrink-0" />
            <PriceCard
              text="총 가격"
              price={parseInt(totalPrice) + parseInt(shipping)}
            />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
};

export default MyCart;
