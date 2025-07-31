import { formatProductPrice, truncateText } from "@/lib/helperfunctions";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product?.slug}`} className="productCard">
      <Image
        src={product?.thumbnail}
        width={200}
        height={200}
        alt={product?.name}
        className="productImage"
      />
      <h3 className="productTitle">{truncateText(product?.name, 20)}</h3>
      <div className="productMeta">
        <div className="price">
          <span>৳ {formatProductPrice(product?.discount_price)}</span>
          <span> {formatProductPrice(product?.regular_price)}</span>
        </div>
        <div className="rating">
          4.8
          <span>
            <Star size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
