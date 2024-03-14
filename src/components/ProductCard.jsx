import React from "react";

const ProductCard = ({
  product: { id, image, title, category, price, description },
}) => {
  return (
    <li
      key={id}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <img src={image} className="w-full" alt={title} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`W${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};

export default ProductCard;
