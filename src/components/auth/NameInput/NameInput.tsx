"use client";
import React, { useState } from "react";

interface NameInputProps {
  text?: string;
  onChange?: (val: string) => void;
  dir?: boolean;
  variant?: "fa-en" | "en-only" | "username";
  minLen?: number;
  iconSide?: "left" | "right";
}

const NameInput: React.FC<NameInputProps> = ({
  text,
  onChange,
  dir = false,
  variant = "fa-en",
  minLen = 3,
  iconSide = "right",
}) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isAsciiAlpha = (s: string) => /^[A-Za-z ]+$/.test(s);

  const isLettersOnly = (s: string) => /^\p{L}+$/u.test(s);

  const isFaEnOnly = (s: string) => {
    const noSpace = s.replace(/\s/g, "");
    return (
      isLettersOnly(noSpace) &&
      !/[^\p{Script=Latin}\p{Script=Arabic}]/u.test(noSpace)
    );
  };

  const USERNAME_RE = /^[A-Za-z0-9._\- ]+$/;

  const byVariantValid = (s: string) => {
    if (variant === "en-only") return s.length >= minLen && isAsciiAlpha(s);
    if (variant === "username")
      return s.length >= minLen && USERNAME_RE.test(s);
    return s.length >= minLen && isFaEnOnly(s);
  };

  const sanitize = (s: string) => {
    if (variant === "en-only") return s.replace(/[^A-Za-z ]/g, "");
    if (variant === "username") return s.replace(/[^A-Za-z0-9._\- ]/g, "");
    return s.replace(/[^\p{L} ]/gu, "");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = sanitize(e.target.value);
    setValue(v);
    onChange?.(v);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      (e.nativeEvent as any).isComposing
    )
      return;

    const allowedNav = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Home",
      "End",
      "Enter",
      "Escape",
    ];
    if (allowedNav.includes(e.key)) return;

    if (variant === "en-only") {
      if (!/^[A-Za-z ]$/.test(e.key)) e.preventDefault();
    } else if (variant === "username") {
      if (!/^[A-Za-z0-9._\- ]$/.test(e.key)) e.preventDefault();
    } else {
      if (!(/^\p{L}$/u.test(e.key) || e.key === " ")) e.preventDefault();
    }
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const cleaned = sanitize(e.clipboardData.getData("text"));
    e.preventDefault();
    if (cleaned) {
      const next = value + cleaned;
      setValue(next);
      onChange?.(next);
    }
  };

  const hasValue = value.length > 0;
  const isValid = byVariantValid(value);
  const isInvalid = hasValue && !isValid;

  const baseDir = dir ? "ltr" : "rtl";
  const inputDir =
    variant === "en-only" ? (focused || hasValue ? "ltr" : "rtl") : baseDir;
  const isRTL = inputDir === "rtl";

  return (
    <div
      className={`field-base w-[343px] h-14 relative ${
        isValid ? "border-[#22c55e] ring-4 ring-[#22c55e]/20" : null
      }`}
    >
      <input
        dir={inputDir}
        placeholder={text}
        type="text"
        inputMode="text"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={isInvalid}
        className={`w-full font-peyda font-normal text-base leading-6 flex items-center
                    bg-transparent text-white placeholder:text-[#7D7D7D]
                    focus:outline-none focus:ring-0
                   ${isRTL ? "text-right mr-4" : "text-left ml-4"}`}
        autoComplete={
          variant === "en-only"
            ? "nickname"
            : variant === "username"
            ? "username"
            : "name"
        }
        spellCheck={false}
        autoCapitalize="none"
      />
    </div>
  );
};

export default NameInput;
