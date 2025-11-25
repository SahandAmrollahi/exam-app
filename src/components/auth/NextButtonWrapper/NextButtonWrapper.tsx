"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import NextPageButton from "../NextPageButton/NextPageButton";

export default function NextButtonWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  let button: React.ReactNode = null;

  if (pathname === "/register/phone")
    button = <NextPageButton type="submit" form="otpForm" />;
  else if (pathname === "/register/name")
    button = <NextPageButton type="submit" form="nameForm" />;
  else if (pathname === "/register/userName")
    button = <NextPageButton type="submit" form="usernameForm" />;
  else if (pathname === "/register/age")
    button = <NextPageButton type="submit" form="ageForm" />;
  else if (pathname === "/register/topics")
    button = <NextPageButton type="submit" form="topicsForm" />;
  else if (pathname === "/register/email")
    button = <NextPageButton type="submit" form="emailForm" />;
  else if (pathname === "/register/password")
    button = <NextPageButton type="submit" form="passwordForm" />;
  else if (pathname === "/login")
    button = <NextPageButton type="submit" form="loginPhone" />;
  else if (pathname === "/login/entryCode")
    button = <NextPageButton onClick={() => router.push("/home")} />;
  else if (pathname === "/login/entryCodePass")
    button = <NextPageButton onClick={() => router.push("/login/password")} />;
  else if (pathname === "/profile/entryCode")
    button = (
      <NextPageButton onClick={() => router.push("/profile/password")} />
    );

  if (!button) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex justify-center">
      <div className="pointer-events-auto w-full max-w-[394px] px-6">
        <div className="flex justify-start">{button}</div>
      </div>
    </div>
  );
}
