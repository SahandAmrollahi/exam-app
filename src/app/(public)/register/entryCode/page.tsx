"use client";
import { useRegistration } from "@/context/register/RegisterContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EntryCodePage() {
  const { dispatch, state } = useRegistration();

  const params = useSearchParams();
  const router = useRouter();

  const phone = params.get("phone") || "";

  useEffect(() => {
    if (!phone) router.replace("/register/phone");
  }, [phone, router]);

  async function handleVerify() {
    if (!phone || !isValid) return;
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          otpCode: otp,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok || !data?.success) {
        console.log(data?.message || "کد تایید نامعتبر است");
        return;
      }
      const temporaryToken = data?.temporaryToken;
      if (!temporaryToken) {
        console.log("پاسخ سرور معتبر نیست (temporaryToken ندارد)");
        return;
      }
      dispatch({
        type: "SET_OTP",
        payload: { temporaryToken, phoneNumber: phone },
      });
      router.push("/register/name");
    } catch {
      console.log("خطای شبکه/سرور");
    }
  }

  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(onlyDigits);
  };

  const isValid = otp.length === 6;

  useEffect(() => {
    if (isValid) handleVerify();
  }, [isValid]);

  useEffect(() => {
    console.log(state);
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
          className={`field-base w-[343px] h-14 relative cursor-text ${
            isValid ? "border-[#22c55e] ring-4 ring-[#22c55e]/20" : null
          }`}
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
            className="absolute inset-0 opacity-0"
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
          <p className="w-[52px] h-6 font-peyda font-semibold text-base leading-6 flex items-center text-center text-[#FFFFFF] ml-2">
            نگرفتی؟
          </p>
          <button className="w-[9fpx] h-6 font-peyda font-semibold text-base leading-6 flex items-center text-center text-[#F9C74F] mr-2 cursor-pointer">
            دوباره بفرست.
          </button>
        </div>
      </section>
    </>
  );
}
