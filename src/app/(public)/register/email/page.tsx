"use client";
import EmailFeild from "@/components/auth/EmailFeild/EmailFeild";
import { useRegistration } from "@/context/register/RegisterContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import NextPageButton from "@/components/NextPageButton/NextPageButton";
// import { useRouter } from "next/navigation";

const Email = () => {
  const [email, setEmail] = useState("");
  const { state, dispatch } = useRegistration();
  const router = useRouter();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_EMAIL",
      payload: email === "" ? null : { email: email },
    });
    router.push("/register/password");
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <section>
      <h1 className="font-peyda font-bold text-[24px] leading-10 flex items-center text-center justify-center text-[#F5F5F5] w-[353px] h-10 mx-auto">
        می‌خوای ایمیلت رو هم اضافه کنی؟
      </h1>
      <h3
        className="font-peyda font-normal text-[16px] leading-6 flex text-[#f5f5f5] text-center justify-center items-center my-[22px] w-[357px] mx-auto"
        style={{ whiteSpace: "pre-line" }}
        dir="rtl"
      >
        این کاملاً اختیاریه، ولی اگه خواستی باهات در تماس باشیم (مثلاً برای
        بازی‌های جدید یا بازیابی حسابت),
        <br /> ایمیلت رو وارد کن
      </h3>
      <form id="emailForm" onSubmit={onSubmit}>
        <EmailFeild text="Email" setEmail={setEmail} email={email} />
      </form>
    </section>
  );
};

export default Email;
