"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/context/register/RegisterContext";
import PasswordField from "@/components/auth/passwordField/passwordField";
import PasswordRules from "@/components/auth/PasswordRules/PasswordRules";

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);

  const [confirmFocused, setConfirmFocused] = useState(false);

  const { state, dispatch } = useRegistration();

  const router = useRouter();

  const handleFocus = () => setTouched(true);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_PASSWORD",
      payload: { password: password, confirmPassword: confirm },
    });
    console.log("will navigate with password:", { password, confirm });

    router.push("/register/boarding");
  };

  useEffect(() => {
    console.log("hi", state);
  }, [state]);

  // === تکرار قوانین (همان‌هایی که PasswordRules استفاده می‌کند) ===
  const hasMin = password.length >= 8;
  const hasLettersAndNumbers = /[A-Za-z]/.test(password) && /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9\s]/.test(password);
  const noSpaces = !/\s/.test(password);
  const matches = confirm.length > 0 && password === confirm;

  const allOk =
    hasMin && hasLettersAndNumbers && hasSpecial && noSpaces && matches;

  const confirmState: "success" | "none" = (() => {
    if (allOk) return "success";
    return "none";
  })();

  return (
    <section className="w-[353px] mx-auto">
      <h1
        className="font-peyda font-bold text-[24px] leading-10 flex items-center text-center justify-center text-[#F5F5F5] w-[353px] h-10"
        dir="rtl"
      >
        انتخاب گذرواژه
      </h1>

      <h3
        className="font-peyda font-normal text-[16px] leading-6 flex text-[#f5f5f5] text-center justify-center items-center my-[22px] w-[357px]"
        dir="rtl"
      >
        یه رمز قوی بزن که فقط خودت بدونی!
      </h3>

      <form onSubmit={onSubmit} id="passwordForm">
        <PasswordField
          value={password}
          onChange={setPassword}
          onFocus={() => {
            handleFocus();
          }}
          placeholder="گذرواژه"
          showMeter
        />

        <PasswordField
          value={confirm}
          onChange={setConfirm}
          onFocus={() => {
            handleFocus();
            setConfirmFocused(true);
          }}
          onBlur={() => {
            setConfirmFocused(false);
          }}
          placeholder="تکرار گذرواژه"
          showMeter={false}
          confirmState={confirmState}
        />

        <PasswordRules value={password} confirm={confirm} touched={touched} />
      </form>
    </section>
  );
};

export default PasswordPage;
