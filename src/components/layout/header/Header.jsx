import React from "react";
import SubHeader from "./SubHeader";
import { Gem } from "lucide-react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import ModeToggle from "@/components/shared/ModeToggle";

import CartBadge from "./CartBadge";

const Header = () => {
  return (
    <header>
      <div className="headerContainer">
        <div className="mainHeader">
          <Link href={"/"} className="headerLogo">
            <Gem size={32} />
            <span>Zaplet</span>
          </Link>

          <div className="userActionBtns">
            <ModeToggle />

            <CartBadge />

            <UserMenu />
          </div>
        </div>
      </div>

      <div className="subHeaderContainer">
        <SubHeader />
      </div>
    </header>
  );
};

export default Header;
