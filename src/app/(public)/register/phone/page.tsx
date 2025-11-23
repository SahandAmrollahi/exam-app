"use client";
import GoogleLogin from "@/components/auth/GoogleLogin/GoogleLogin";
import PhoneField from "@/components/auth/phoneField/phoneField";
import { useState } from "react";

const PhonePage = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[352px] flex-col items-center overflow-hidden pt-10">
      <h1
        className="w-[343px] h-10 font-peyda font-bold text-[24px] leading-10 flex justify-center items-center text-center text-white mb-14"
        dir="rtl"
      >
        وقت ثبت‌نامه! بیا شروع کنیم!
      </h1>
      <PhoneField setPhone={setPhone} phone={phone} />

      <div>
        <p
          className="w-[343px] h-[30px] font-peyda text-[13px] leading-[15px] items-center text-center text-[#CACACA] my-4"
          dir="rtl"
        >
          با ادامه دادن این مرحله، شما با{" "}
          <span className="text-[#F9C74F]">شرایط استفاده</span> و{" "}
          <span className="text-[#F9C74F]">سیاست حفظ حریم خصوصی </span>
          ما موافقت می‌کنید.
        </p>
      </div>
      <GoogleLogin />
    </div>
  );
};

export default PhonePage;
