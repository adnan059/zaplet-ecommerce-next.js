"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import googleLogo from "../../../../public/images/google.png";
import { handleGoogleLogin } from "@/lib/server-actions/auth-action";
import { correctAnswer } from "@/lib/constants";

export default function Page() {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (answer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [answer]);

  return (
    <section>
      <div className="sectionContainer pt-[95px]">
        <h2 className="sectionTitle">Login</h2>

        <div className="securityQuestion">
          <label htmlFor="securityQ">
            What is the internal code name for our admin panel?
          </label>
          <span>
            <input
              type="password"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="securityQ"
              name="securityQ"
              placeholder="Enter the answer"
              className={isCorrect ? "correct" : ""}
            />
            {isCorrect && <Check className="tick" size={36.5} />}
          </span>
        </div>

        <form action={handleGoogleLogin} className="googleLogin">
          <button type="submit" disabled={!isCorrect} className="loginBtn">
            <Image src={googleLogo} width={24} height={24} alt="google logo" />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </section>
  );
}
