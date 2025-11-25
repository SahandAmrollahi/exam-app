"use client";
import GoogleLogin from "@/components/auth/GoogleLogin/GoogleLogin";
import PasswordField from "@/components/auth/passwordField/passwordField";
import PhoneField from "@/components/auth/phoneField/phoneField";
import { useLogin } from "@/context/login/LoginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const { state, dispatch } = useLogin();

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");


  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_PHONENUMBER",
      payload: { phone_number: 0 + phone, password: password },
    });
    router.push(`/login/entryCode?phone=${0 + phone}`);
  };
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <section className="flex flex-col items-center">
      <h1
        dir="rtl"
        className="font-peyda font-bold text-[24px] leading-[40px] flex items-center justify-center text-center text-white my-4"
      >
        خوش اومدی!
      </h1>
      <form onSubmit={onSubmit} id="loginPhone">
        <PhoneField setPhone={setPhone} phone={phone} />

        <div className="mt-[12px]">
          <PasswordField
            placeholder="گذرواژه"
            value={password}
            onChange={setPassword}
          />
        </div>
      </form>

      <div className="w-[343px] flex flex-row justify-between items-center my-4">
        <p
          dir="rtl"
          className="h-[15px] font-peyda font-semibold text-[13px] leading-[15px] flex items-center justify-center text-[#F9C74F]"
        >
          <Link href="/login/entryCodePass">فراموشی رمز</Link>
        </p>
        <p
          dir="rtl"
          className="h-[15px] font-peyda font-semibold text-[13px] leading-[15px] flex items-center justify-center text-[#F9C74F]"
        >
          <Link href="/login/entryCode">ورود با کد یکبار مصرف</Link>
        </p>
      </div>

      <GoogleLogin />
    </section>
  );
};

export default Login;
