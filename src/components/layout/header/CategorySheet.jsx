"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Gem, Menu } from "lucide-react";

import { useRouter } from "next/navigation";

const CategorySheet = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = (slug) => {
    setIsOpen(false);
    router.push(`/products/${slug}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu size={28} className="categoryMenubar" />
      </SheetTrigger>
      <SheetContent side="left" className={"categorySheet"}>
        <SheetHeader>
          <SheetTitle className={"categorySheetLogo"}>
            <Gem size={28} />
            <span>Zaplet</span>
          </SheetTitle>

          <div className="categorySheetContent">
            <h2>Product Categories</h2>

            <div className="categorySheetContainer">
              {categories?.map((cat) => (
                <button key={cat?.slug} onClick={() => handleClick(cat?.slug)}>
                  {cat?.name}
                </button>
              ))}
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
