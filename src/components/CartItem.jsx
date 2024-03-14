import React from "react";

const CartItem = ({
  product,
  product: { id, image, title, option, quantity, price },
}) => {
  return (
    <li>
      <img src={image} alt={title} />
    </li>
  );
};

export default CartItem;
