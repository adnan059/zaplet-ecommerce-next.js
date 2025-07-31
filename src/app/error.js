// src/app/error.js
"use client";

import { RotateCcw } from "lucide-react";

export default function ErrorPage({ error, reset }) {
  console.log("Error:", error);

  return (
    <section>
      <div className="sectionContainer">
        <div className="errorPage">
          <h2>Something Went Wrong!</h2>
          <p>{error?.message}</p>
          <button onClick={() => reset()}>
            <RotateCcw /> Try again
          </button>
        </div>
      </div>
    </section>
  );
}
