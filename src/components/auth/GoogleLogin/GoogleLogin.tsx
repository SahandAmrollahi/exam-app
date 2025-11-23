import React from "react";
import Image from "next/image";

const GoogleLogin: React.FC = () => {
  return (
    <div>
      <div className="w-[343px] h-[16px] flex flex-row justify-center items-center gap-1 mb-4">
        <div className="w-[164px] h-0 border-[1px] border-solid border-[#4C4C4C]" />
        <p className="w-[8px] h-[16px] font-manrope font-medium text-[12px] leading-[16px] flex items-center justify-center text-[#CECECE]">
          یا
        </p>
        <div className="w-[164px] h-0 border-[1px] border-solid border-[#4C4C4C]" />
      </div>
      <div className="bg-[#232323] box-border flex flex-row items-center py-2 px-2 gap-4 w-[343px] h-[56px] border-[1px] border-solid rounded-2xl border-[#4C4C4C] flex justify-center items-center cursor-pointer">
        <p
          dir="rtl"
          className="w-[74px] h-[15px] font-peyda font-medium text-[13px] leading-[15px] flex items-center justify-center text-[#CACACA]"
        >
          ورود با Google
        </p>
        <Image src="/assets/svg/Google.svg" alt="google" width={24} height={24} />
      </div>
    </div>
  );
};

export default GoogleLogin;
