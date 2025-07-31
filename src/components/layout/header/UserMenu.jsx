import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import getCurrentUser, { handleLogout } from "@/lib/server-actions/auth-action";

const UserMenu = async () => {
  const currentUser = await getCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="userMenuTrigger">
        <CircleUserRound size={28} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"userMenuContent"}>
        <DropdownMenuItem className={"userMenuItem"}>
          {currentUser !== null && <Link href={"/dashboard"}>Dashboard</Link>}
        </DropdownMenuItem>
        <DropdownMenuItem className={"userMenuItem"}>
          {currentUser === null && <Link href={"/auth/login"}>Login</Link>}
          {currentUser !== null && <a onClick={handleLogout}>Logout</a>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
