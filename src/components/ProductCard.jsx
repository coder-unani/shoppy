import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  product: { id, image, title, category, price },
}) => {
  const navigate = useNavigate();
  return (
    <li
      key={id}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 duration-300 ease-in-out"
      onClick={() => {
        navigate(`/product/${id}`, { state: { product } });
      }}
    >
      <img src={image} className="w-full" alt={title} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`￦${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};

export default ProductCard;
