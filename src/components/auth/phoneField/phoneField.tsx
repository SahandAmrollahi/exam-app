"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface OtpResponse {
  success: boolean;
  expiresIn?: number;
  message?: string;
}
type PhoneType = {
  setPhone?: Dispatch<SetStateAction<string>>;
  phone?: string;
};
const PhoneField: React.FC<PhoneType> = ({ setPhone, phone }) => {
  const pathname = usePathname();

  const router = useRouter();

  const digits = phone?.replace(/\D/g, "").slice(0, 10);

  const isValid = digits?.length === 10;
  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    const phoneNumber = "0" + digits;
    if (pathname === "/register/phone") {
      try {
        router.push(
          `/register/entryCode?phone=${encodeURIComponent(phoneNumber)}`
        );
      } catch (e: unknown) {
        console.log(e, "خطای ناشناخته");
      }
    } else if (pathname === "/login/login") {
      try {
        const res = await fetch("/api/auth/otp/requestLogin/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber }),
        });
        const data = (await res.json()) as OtpResponse;

        if (!res.ok || data?.success !== true) {
          throw new Error(data?.message || "ارسال کد تایید ناموفق بود");
        }
        router.push(
          `/login/entryCode?phone=${encodeURIComponent(phoneNumber)}`
        );
      } catch (e: unknown) {
        console.log("خطای ناشناخته");
      }
    }
  }

  return (
    <form
      id={pathname === "/register/phone" ? "otpForm" : "loginForm"}
      onSubmit={handleSend}
    >
      <div
        className="bg-[#232323] box-border flex flex-row items-center py-2 px-2 gap-4
           border border-solid rounded-2xl border-[#4C4C4C]
           transition-all duration-200 w-[343px] h-14 relative"
      >
        <div className="flex flex-row items-start p-2 gap-2 w-[47px] h-10 rounded-xl font-inter font-normal text-base bg-[#933147] text-[#F5F5F5]">
          +98
        </div>

        <input
          className="w-full pr-10 font-manrope font-normal text-base leading-6 bg-transparent placeholder-[#7D7D7D] focus:outline-none focus:ring-0 text-white"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          dir="ltr"
          placeholder="9192054609"
          value={digits}
          onChange={(e) => setPhone?.(e.target.value)}
        />
      </div>
    </form>
  );
};

export default PhoneField;
