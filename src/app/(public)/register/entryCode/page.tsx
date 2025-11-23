"use client";
import { useRegistration } from "@/context/register/RegisterContext";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EntryCodePage() {
  const { dispatch, state } = useRegistration();

  const params = useSearchParams();
  const router = useRouter();
  const shouldShowToast = params.get("toast") === "sent";
  const [toastOpen, setToastOpen] = useState(shouldShowToast);

  useEffect(() => {
    if (!shouldShowToast) return;
    const u = new URL(window.location.href);
    u.searchParams.delete("toast");
    router.replace(u.pathname + "?" + u.searchParams.toString(), {
      scroll: false,
    });
  }, [shouldShowToast]);

  // اتصال به auth/otp/verify/route.ts

  const phone = params.get("phone") || "";
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [verifyState, setVerifyState] = useState<null | "success" | "error">(
    null
  );

  useEffect(() => {
    if (!phone) router.replace("/register/phone");
  }, [phone, router]);

  async function handleVerify() {
    if (!phone || !isValid) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          otpCode: otp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setVerifyState("error");
        setErr(data?.message || "کد تایید نامعتبر است");
        return;
      }
      const temporaryToken = data?.temporaryToken;
      if (!temporaryToken) {
        setVerifyState("error");
        setErr("پاسخ سرور معتبر نیست (temporaryToken ندارد)");
        return;
      }
      dispatch({
        type: "SET_OTP",
        payload: { temporaryToken, phoneNumber: phone },
      });

      setVerifyState("success");
      router.push("/register/name");
    } catch {
      setErr("خطای شبکه/سرور");
    } finally {
      setLoading(false);
    }
  }

  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(onlyDigits);
  };

  const isInvalid = otp.length > 0 && otp.length < 6;
  const isValid = otp.length === 6;

  useEffect(() => {
    if (isValid && !loading && verifyState === null) handleVerify();
  }, [isValid, loading]);

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
          className="bg-[#232323] box-border flex flex-row items-center py-2 px-2 gap-4
           border border-solid rounded-2xl border-[#4C4C4C]
           transition-all duration-200 w-[343px] h-14 relative cursor-text"
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
          className="flex flex-row justify-center items-center w-full mt-[16px]"
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
