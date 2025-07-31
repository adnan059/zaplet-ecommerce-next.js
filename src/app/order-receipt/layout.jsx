"use client";

import { useOrderStore } from "@/store/useOrderStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { orderDetails, _hasHydrated } = useOrderStore();
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (_hasHydrated) {
      if (!orderDetails) {
        router.push("/"); // ✅ Safe redirect after hydration
      } else {
        setShouldRender(true); // ✅ Confirm it’s safe to show children
      }
    }
  }, [_hasHydrated, orderDetails]);

  if (!shouldRender) return null;

  return <div>{children}</div>;
}
