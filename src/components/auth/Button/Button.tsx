import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
};

const Button: React.FC<Props> = ({
  text,
  onClick,
  backgroundColor = "bg-[#F9C74F] text-[#363537]",
}: {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
}) => {
  return (
    <button
      className={`flex flex-row justify-center items-center py-[15.5493px] px-[57.437px] gap-[7.77px] w-[352px] h-[55.1px] rounded-[48.5916px] font-peyda font-semibold text-[15.5493px] leading-[23px] order-1 select-none mb-[12.9px] cursor-pointer ${backgroundColor}`}
      onClick={onClick}
      type="button"
      dir="rtl"
    >
      {text}
    </button>
  );
};

export default Button;
