"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navigate = ({ to, replace = false }) => {
  const router = useRouter();

  useEffect(() => {
    replace ? router.replace(to) : router.push(to);
  }, [to, replace, router]);

  return null;
};

export default Navigate;
