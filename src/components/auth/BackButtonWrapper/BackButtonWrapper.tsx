"use client";
import { usePathname } from "next/navigation";
import BackPageButton from "../BackPageButton/BackPageButton";

export default function BackButtonWrapper() {
  const pathname = usePathname();
  const hideBackButton =
    pathname === "/" ||
    pathname === "/register" ||
    pathname === "/setting" ||
    pathname === "/profile" ||
    pathname === "/home" ||
    pathname === "/createpackage/create" ||
    pathname === "/createpackage" ||
    pathname === "/createpackage/package" ||
    pathname === "/createpackage/more" ||
    pathname === "/createpackage/create/msq" ||
    pathname === "/createpackage/create/truefalse" ||
    pathname === "/createpackage/create/typeanswer" ||
    pathname === "/createpackage/create/slider" ||
    pathname === "/createpackage/create/puzzle" ||
    pathname === "/gamesession/packageresult" ||
    pathname === "/gamesession/packageinfo" ||
    pathname === "/gamesession/draftpackageinfo" ||
    pathname === "/discover" ||
    pathname === "/gamesession" ||
    pathname === "/join" ||
    pathname === "/createpackage/review1";
  pathname === "*";
  if (hideBackButton) return null;
  return <BackPageButton linkSkip="/register/password" />;
}
