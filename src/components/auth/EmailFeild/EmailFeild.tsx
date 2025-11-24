"use client";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  text?: string;
  setEmail?: any;
  email: string;
};

const EmailFeild: React.FC<Props> = ({ text, setEmail, email }) => {
  const [focused, setFocused] = useState(false);

  const isValidEmailStrict = (raw: string): boolean => {
    const s = raw.trim();

    if (s === "" || /\s/.test(s) || s.length > 254) return false;

    const atCount = (s.match(/@/g) || []).length;
    if (atCount !== 1) return false;

    const [local, domain] = s.split("@");
    if (!local || !domain) return false;

    if (local.length < 1 || local.length > 64) return false;
    if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;
    if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
      return false;

    if (domain.length < 1 || domain.length > 253) return false;

    const labels = domain.split(".");
    if (labels.length < 2) return false;

    for (const label of labels) {
      if (label.length < 1 || label.length > 63) return false;
      if (!/^[A-Za-z0-9-]+$/.test(label)) return false;
      if (label.startsWith("-") || label.endsWith("-")) return false;
    }

    const tld = labels[labels.length - 1];
    if (!/^[A-Za-z]{2,63}$/.test(tld)) return false;

    return true;
  };

  const isValid = email.length > 0 && isValidEmailStrict(email);
  const isInvalid = email.length > 0 && !isValid;

  return (
    <div
      className={`field-base w-[343px] h-14 relative mx-auto ${
        isValid ? "border-[#22c55e] ring-4 ring-[#22c55e]/20" : null
      }`}
      dir="ltr"
    >
      <input
        placeholder={text ?? "email@example.com"}
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === " ") e.preventDefault();
        }}
        className="w-full pr-10 font-peyda font-normal text-base leading-6
                   flex items-center bg-transparent text-white placeholder:text-[#7D7D7D]
                   focus:outline-none focus:ring-0 ml-4"
        spellCheck={false}
        autoCapitalize="none"
      />
    </div>
  );
};

export default EmailFeild;
