"use client";
import Image from "next/image";
import React from "react";

type NextPageButton = {
  onClick?: () => void;
  form?: string;
  type?: "button" | "submit";
  className?: string;
};

const NextPageButton: React.FC<NextPageButton> = ({
  onClick,
  type = "button",
  form,
  className = "",
}) => {
  return (
    <button
      aria-label="بعد"
      type={type}
      form={form}
      className={`cursor-pointer ${className}`.trim()}
      onClick={onClick}
    >
      <Image src="/assets/svg/ArrowLeft.svg" alt="ArrowLeft" width={56} height={56} />
    </button>
  );
};

export default NextPageButton;
