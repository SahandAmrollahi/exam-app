"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type RegNavProps = {
  linkSkip?: string;
};

const BackPageButton: React.FC<RegNavProps> = ({ linkSkip }) => {
  const router = useRouter();
  const pathName = usePathname();
  const showSkip = pathName === "/register/email" && linkSkip;
  const arrowIcon = "/assets/svg/ArrowRight.svg";

  return (
    <nav className="back-page-button flex flex-row items-center w-[390px] h-[56px] px-[12px] justify-between mt-[44px] mx-auto">
      {showSkip ? (
        <>
          <Link
            href={linkSkip!}
            className="h-[24px] font-peyda font-semibold text-[16px] leading-[24px] text-[#7D7D7D] cursor-pointer"
          >
            رد کردن
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="بازگشت"
          >
            <Image
              src={arrowIcon}
              alt="برگشت"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </button>
        </>
      ) : (
        <button
          type="button"
          className="ml-auto"
          onClick={() => router.back()}
          aria-label="بازگشت"
        >
          <Image
            src={arrowIcon}
            alt="برگشت"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </button>
      )}
    </nav>
  );
};

export default BackPageButton;
