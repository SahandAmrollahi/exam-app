// src/components/auth/PasswordField/PasswordField.tsx
"use client";
import { passwordStrength } from "@/lib/passwordStrength";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type ConfirmState = "success" | "none";

type PasswordInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  showMeter?: boolean;
  meterFrom?: string;
  confirmState?: ConfirmState;
};
const PasswordField: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  showMeter = false,
  meterFrom,
  confirmState,
}) => {
  const [focused, setFocused] = useState(false);
  const [sel, setSel] = useState(0);
  const [show, setShow] = useState(false);

  const [meterArmed, setMeterArmed] = useState(false);
  const [displayLevel, setDisplayLevel] = useState<0 | 1 | 2 | 3 | 4>(0);

  type OverlayDir = "in" | "out";
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayArmed, setOverlayArmed] = useState(false);
  const [overlayText, setOverlayText] = useState("");
  const [overlayDir, setOverlayDir] = useState<OverlayDir>("in");

  const inputRef = useRef<HTMLInputElement>(null);

  const dir = focused || value.length > 0 ? "ltr" : "rtl";

  const strengthSource = meterFrom ?? value;
  const targetLevel = passwordStrength(strengthSource); // 0..4

  const uiLevel = showMeter && value.length > 0 ? displayLevel : 0;

  const strengthLabel =
    uiLevel === 4
      ? "افسانه ای"
      : uiLevel === 3
      ? "حماسی"
      : uiLevel === 2
      ? "نایاب"
      : uiLevel === 1
      ? "معمولی"
      : "";

  const strengthLabelColor =
    uiLevel === 4
      ? "#22c55e"
      : uiLevel === 3
      ? "#facc15"
      : uiLevel === 2
      ? "#f59e0b"
      : uiLevel === 1
      ? "#ef4444"
      : "#F5F5F5";

  const DOT = 8;
  const GAP = 3;
  const SLOT = DOT + GAP;
  const PADDING_X = 24;

  const updateSel = () => {
    const i = inputRef.current?.selectionStart ?? value.length;
    setSel(i);
  };

  useEffect(() => {
    const i = inputRef.current?.selectionStart ?? value.length;
    setSel(i);
  }, [value, focused]);

  useEffect(() => {
    if (value.length === 0 && show) setShow(false);
  }, [value, show]);

  useEffect(() => {
    if (showMeter && value.length > 0) {
      setMeterArmed(false);
      const id = requestAnimationFrame(() => setMeterArmed(true));
      return () => cancelAnimationFrame(id);
    } else {
      setMeterArmed(false);
    }
  }, [showMeter, value.length]);

  useEffect(() => {
    if (!(showMeter && value.length > 0)) {
      setDisplayLevel(0);
      return;
    }
    if (displayLevel === targetLevel) return;

    let current = displayLevel;
    const dirStep = targetLevel > current ? 1 : -1;
    const stepDelay = 120; // ms

    const id = setInterval(() => {
      current = (current + dirStep) as 0 | 1 | 2 | 3 | 4;
      setDisplayLevel(current);
      if (current === targetLevel) clearInterval(id);
    }, stepDelay);

    return () => clearInterval(id);
  }, [targetLevel, showMeter, value.length]);

  useEffect(() => {
    if (value.length === 0) {
      setOverlayActive(false);
      setOverlayArmed(false);
      return;
    }

    setOverlayText(value);
    setOverlayDir(show ? "in" : "out");
    setOverlayActive(true);
    setOverlayArmed(false);

    const id1 = requestAnimationFrame(() => setOverlayArmed(true));
    const id2 = setTimeout(() => {
      setOverlayActive(false);
      setOverlayArmed(false);
    }, 450);

    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(id2);
    };
  }, [show, value]);

  return (
    <div className="w-[343px] mb-[19px]">
      <div
        dir={dir}
        className={`relative h-14 bg-[#232323] rounded-2xl flex items-center overflow-hidden border border-solid border-[#4C4C4C] ${
          confirmState === "success"
            ? "border border-[#22c55e] shadow-[0_0_0_8px_rgba(34,197,94,0.08)]"
            : null
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none flex items-center overflow-hidden px-6"
        >
          {!show && value.length === 0 && (
            <span className="text-[#9CA3AF] font-peyda text-base leading-6">
              {placeholder}
            </span>
          )}

          {!show && value.length > 0 && (
            <>
              <div className="flex items-center" style={{ gap: `${GAP}px` }}>
                {Array.from({ length: value.length }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-block rounded-full"
                    style={{
                      width: `${DOT}px`,
                      height: `${DOT}px`,
                      background: "#7D7D7D",
                    }}
                  />
                ))}
              </div>
              {focused && (
                <span
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: `${PADDING_X + sel * SLOT}px`,
                    width: "2px",
                    height: "20px",
                    background: "#FFFFFF",
                  }}
                />
              )}
            </>
          )}
        </div>

        <input
          ref={inputRef}
          className={`relative z-1 w-full h-full bg-transparent font-peyda font-normal text-base leading-6 px-6 focus:outline-none focus:ring-0 ${
            show
              ? overlayActive
                ? "text-transparent caret-white"
                : "text-white caret-white"
              : "text-transparent selection:bg-transparent selection:text-transparent"
          }`}
          style={{ caretColor: show ? undefined : "transparent" }}
          type="text"
          value={value}
          placeholder={show ? placeholder ?? "" : ""}
          onChange={(e) => {
            onChange(e.target.value);
            requestAnimationFrame(updateSel);
          }}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
            requestAnimationFrame(updateSel);
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          onClick={updateSel}
          onKeyUp={updateSel}
          onSelect={updateSel}
          inputMode="text"
          autoComplete="new-password"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />

        {value.length > 0 && (
          <button
            type="button"
            aria-label={show ? "مخفی کردن گذرواژه" : "نمایش گذرواژه"}
            title={show ? "مخفی کردن گذرواژه" : "نمایش گذرواژه"}
            onClick={() => {
              setShow((s) => !s);
              requestAnimationFrame(() => {
                inputRef.current?.focus();
                updateSel();
              });
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-md cursor-pointer"
          >
            <span
              className="relative block"
              style={{ width: 19.33, height: 16 }}
            >
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: show ? 0 : 1,
                  transform: show ? "translateY(6px)" : "translateY(0)",
                  transition:
                    "opacity 300ms ease-out, transform 300ms ease-out",
                }}
              >
                <Image
                  src="/assets/svg/Eye.svg"
                  width={19.33}
                  height={16}
                  alt="show"
                />
              </span>

              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? "translateY(0)" : "translateY(6px)",
                  transition:
                    "opacity 300ms ease-out, transform 300ms ease-out",
                }}
              >
                <Image
                  src="/assets/svg/Eyeline.svg"
                  width={19.33}
                  height={16}
                  alt="hide"
                />
              </span>
            </span>
          </button>
        )}

        {overlayActive && (
          <div className="absolute inset-0 pointer-events-none flex items-center px-6">
            <div className="flex" dir="ltr">
              {[...overlayText].map((ch, i) => {
                const startOpacity = overlayDir === "in" ? 0 : 1;
                const endOpacity = overlayDir === "in" ? 1 : 0;
                const startY = overlayDir === "in" ? 6 : 0;
                const endY = overlayDir === "in" ? 0 : 6;
                return (
                  <span
                    key={i}
                    className="font-peyda text-base leading-6 text-white"
                    style={{
                      opacity: overlayArmed ? endOpacity : startOpacity,
                      transform: overlayArmed
                        ? `translateY(${endY}px)`
                        : `translateY(${startY}px)`,
                      transition:
                        "opacity 300ms ease-out, transform 300ms ease-out",
                      transitionDelay: `${i * 25}ms`,
                      whiteSpace: "pre",
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showMeter && value.length > 0 && (
        <>
          <div className="mt-[5.44px] flex justify-center px-3 box-border">
            <div className="h-[9px] flex flex-row-reverse gap-[3px]">
              {["#ef4444", "#f59e0b", "#facc15", "#22c55e"].map(
                (color, idx) => {
                  const active = uiLevel > idx;
                  return (
                    <div
                      key={idx}
                      className="h-full flex justify-end"
                      style={{ width: "78px" }}
                    >
                      <div
                        className="h-full transition-[width] duration-300 ease-out"
                        style={{
                          width: active && meterArmed ? "100%" : "0%",
                          backgroundColor: color,
                          borderRadius: "3.63px",
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="flex justify-end mt-[7.56px] pr-3">
            <span
              className="font-peyda text-[16px] leading-4"
              style={{ color: strengthLabelColor }}
            >
              {strengthLabel}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordField;
