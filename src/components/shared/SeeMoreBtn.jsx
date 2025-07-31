"use client";
import { useRouter } from "next/navigation";

export default function SeeMoreButton({ urlPart }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(urlPart);
        router.refresh();
      }}
      className="seeMoreBtn"
    >
      See More
    </button>
  );
}
