"use client";
import NameInput from "@/components/auth/NameInput/NameInput";
import { useRegistration } from "@/context/register/RegisterContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserName: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();

  const { state, dispatch } = useRegistration();
  const [username, setUsername] = useState(state.username || "");

  const handle: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_USERNAME",
      payload: { username: username },
    });
    router.push("/register/age");
  };

  useEffect(() => {
    console.log("RegistrationContext state changed (username-page):", state);
  }, [state]);

  return (
    <section>
      <h1 className="w-[343px] h-10 font-peyda font-bold text-[24px] leading-6 flex items-center justify-center text-center text-[#FFFFFF] mb-14 mx-auto">
        نام کاربری
      </h1>
      {/* onSubmit={} */}
      <form id="usernameForm" onSubmit={handle}>
        <div className="relative w-full h-[260px]">
          <div className="field-group w-[343px] h-60 flex items-center flex-col justify-between absolute left-1/2 top-0 transform -translate-x-1/2 z-10">
            <div
              className="p-0 z-10"
              onFocus={() => setIsSelected(true)}
              onBlur={() => setIsSelected(false)}
            >
              <NameInput
                text="username"
                dir
                variant="username"
                onChange={setUsername}
              />
            </div>

            {isSelected && (
              <div
                className="field-outline box-border w-[343px] h-32 rounded-b-2xl z-0 transform -translate-y-[70px] border border-solid border-[#4C4C4C] bg-[#232323] transition-all duration-200"
                dir="rtl"
              >
                <p className="h-7 font-peyda font-normal text-sm leading-6 flex items-center text-right mr-[21px] mt-[27px] text-[#F9C74F]">
                  نباید فاصله داشته باشه
                </p>
                <p className="h-7 font-peyda font-normal text-sm leading-6 flex items-center text-right mr-[21px] text-[#F9C74F]">
                  حداقل ۳ کاراکتر باشه
                </p>
                <p className="h-7 font-peyda font-normal text-sm leading-6 flex items-center text-right mr-[21px] text-[#F9C74F]">
                  فقط از حروف، اعداد و _ استفاده شه
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default UserName;
