"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useRegistration } from "@/context/register/RegisterContext";
import NameInput from "@/components/auth/NameInput/NameInput";

const Name: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const router = useRouter();

  const [firstName, setFirstName] = useState(state.firstName || "");
  const [lastName, setLastName] = useState(state.lastName || "");
  const [displayName, setDisplayName] = useState(state.displayName || "");

  const HandleNext: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_NAME",
      payload: {
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
      },
    });
    router.push("/register/userName");
  };

  useEffect(() => {
    console.log("RegistrationContext state changed (name-page):", state);
  }, [state]);

  return (
    <section>
      <h1 className="w-[343px] h-10 font-peyda font-bold text-[24px] leading-10 flex justify-center items-center text-center text-[#FFFFFF] mb-14 mx-auto">
        اسمت چیه؟
      </h1>

      <form id="nameForm" onSubmit={HandleNext}>
        <div className="w-[343px] h-60 flex items-center flex-col justify-between mx-auto">
          <NameInput
            text="نام"
            variant="fa-en"
            iconSide="left"
            onChange={setFirstName}
          />
          <NameInput
            text="نام خانوادگی"
            variant="fa-en"
            iconSide="left"
            onChange={setLastName}
          />

          <h2
            className="w-[343px] h-6 font-peyda font-normal text-base leading-6 flex items-center text-center justify-center self-stretch text-white"
            dir="rtl"
          >
            خیلیا یه اسم خفن هم واسه خودشون می‌سازن!
          </h2>

          <NameInput
            text="نام نمایشی در پروفایل"
            variant="fa-en"
            iconSide="left"
            onChange={setDisplayName}
          />
        </div>
      </form>
    </section>
  );
};

export default Name;
