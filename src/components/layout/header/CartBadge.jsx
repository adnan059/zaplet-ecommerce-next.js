"use client";

import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartBadge = () => {
  const { cartItems } = useCartStore();
  const itemNumber = cartItems?.length;
  return (
    <Link className="shoppingCartLink" href={"/cart"}>
      <Badge className={"shoppingCartNumber"}>{itemNumber}</Badge>
      <ShoppingCart size={28} />
    </Link>
  );
};

export default CartBadge;
