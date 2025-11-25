"use client";
import { useLogin } from "@/context/login/LoginContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type User = {
  id: string;
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};

type DataResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
  message: string;
};

export default function EntryCodePage() {
  const { dispatch, state } = useLogin();

  const params = useSearchParams();
  const router = useRouter();

  const phone = params.get("phone") || "";

  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(onlyDigits);
  };

  const isValid = otp.length === 6;

  useEffect(() => {
    if (!isValid || !phone) return;
    dispatch({
      type: "SET_LOGIN",
      payload: {
        otp: otp,
      },
    });
    (async () => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data: DataResponse = await res.json();
      console.log(data);
      const accessToken = data?.accessToken;
      const message = data?.message;
      console.log("hi");

      console.log(message);
      window.localStorage.setItem("accessToken", accessToken);
      router.push(`/home?message=${message}`);
    })();
  }, [state, otp, dispatch, isValid, phone, router]);

  const loggedOnce = useRef(false);

  useEffect(() => {
    if (loggedOnce.current) return;
    loggedOnce.current = true;
    console.log("LoginContext state changed:", state);
  }, [state]);

  useEffect(() => {
    console.log("data omad ?", state);
  }, [state]);

  return (
    <>
      <section className="flex flex-col items-center">
        <h1
          className="w-[343px] h-20 px-6 font-peyda font-bold text-[24px] leading-10 flex items-center text-center text-[#FFFFFF] mb-14"
          dir="rtl"
        >
          کدی که برات پیامک کردیم رو وارد کن.
        </h1>

        <div
          className={`field-base w-[343px] h-[56px] relative cursor-text ${
            isValid ? "border-[#22c55e] ring-4 ring-[#22c55e]/20" : null
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            aria-label="کد ۶ رقمی"
            className="absolute inset-0 opacity-0 pointer-events-none"
          />

          <div className="w-full h-full flex items-center justify-center gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-fit h-fit flex items-center justify-center text-xl font-bold ${
                  otp[i] ? "text-white" : "text-[#7D7D7D]"
                }`}
              >
                {otp[i] ? otp[i] : "●"}
              </div>
            ))}
          </div>
        </div>

        <div
          dir="rtl"
          className="flex flex-row justify-center items-center w-full mt-4"
        >
          <p className="w-[52px] h-6 font-peyda leading-6 text-[15px] flex items-center text-center text-[#FFFFFF] ml-2">
            نگرفتی؟
          </p>
          <button className="w-[91px] h-6 font-peyda leading-6 text-[15px] flex items-center text-center text-[#F9C74F] mr-2 cursor-pointer">
            دوباره بفرست.
          </button>
        </div>
      </section>
    </>
  );
}
