"use client";
import Image from "next/image";
import React from "react";

type Status = "warn" | "ok" | "err";
function statusFor(condition: boolean, touched: boolean): Status {
  if (!touched) return "warn";
  return condition ? "ok" : "err";
}

const Row: React.FC<{ status: Status; label: string }> = ({
  status,
  label,
}) => {
  const icon =
    status === "ok"
      ? "/assets/svg/Confirm.svg"
      : status === "err"
      ? "/assets/svg/Error.svg"
      : "/assets/svg/Warning.svg";

  return (
    <div
      className="flex flex-row items-center justify-start gap-[3px] mb-[3px] w-[343px]"
      dir="rtl"
    >
      <Image
        src={icon}
        width={12}
        height={12}
        alt="rule-icon"
        className="shrink-0"
      />
      <p className="font-peyda font-normal text-[12px] leading-4 text-right text-[#FFFFFF]">
        {label}
      </p>
    </div>
  );
};

const PasswordRules: React.FC<{
  value: string;
  confirm: string;
  touched: boolean;
}> = ({ value, confirm, touched }) => {
  const hasMin = value.length >= 8;
  const hasLettersAndNumbers = /[A-Za-z]/.test(value) && /\d/.test(value);
  const hasSpecial = /[^A-Za-z0-9\s]/.test(value);
  const noSpaces = !/\s/.test(value);
  const matches = confirm.length > 0 && value === confirm;

  return (
    <div>
      <Row status={statusFor(hasMin, touched)} label="حداقل ۸ کاراکتر" />
      <Row
        status={statusFor(hasLettersAndNumbers, touched)}
        label="شامل عدد و حرف"
      />
      <Row
        status={statusFor(hasSpecial, touched)}
        label="استفاده از یک علامت خاص"
      />
      <Row status={statusFor(noSpaces, touched)} label="بدون فاصله" />
      <Row
        status={statusFor(matches, touched)}
        label="تطابق با تکرار گذرواژه"
      />
    </div>
  );
};

export default PasswordRules;
