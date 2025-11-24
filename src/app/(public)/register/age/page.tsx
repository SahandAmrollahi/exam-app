"use client";
import Interval from "@/components/auth/Interval/Interval";
import { useRegistration } from "@/context/register/RegisterContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const START_TO_ID: Record<number, number> = {
  7: 1,
  10: 2,
  13: 3,
  16: 4,
  19: 5,
  25: 6,
};

const Age: React.FC = () => {
  const { state, dispatch } = useRegistration();

  const router = useRouter();

  const [startStr, setStartStr] = useState<string>("");

  const onChangeInterval = (val: string) => setStartStr(val);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const start = Number(startStr);
    const ageRangeId = START_TO_ID[start];
    if (!ageRangeId) return;

    dispatch({ type: "SET_AGE", payload: { ageRangeId } });
    router.push("/register/email");
  };
  useEffect(() => {
    console.log("ageeee pageeee", state);
  }, [state]);
  return (
    <section dir="rtl">
      <h1 className="w-[353px] h-10 font-peyda font-bold text-[24px] leading-10 flex items-center justify-center text-[#FFFFFF] mx-auto">
        چندسالته؟
      </h1>

      <form id="ageForm" onSubmit={onSubmit} className="w-[353px] mx-auto">
        <Interval
          min={7}
          max={60}
          initialText="برای انتخاب بازهٔ سنی، همین اهرم را بکشید"
          onChange={onChangeInterval}
        />
      </form>

      <h2 className="w-[353px] h-12 font-peyda font-normal text-[16px] leading-6 flex items-center justify-center text-[#FFFFFF] mt-[78.23px] text-center mx-auto">
        نگران نباش! فقط برای تنظیمات بهتر استفاده می‌شه،
        <br />
        نه برای نمایش به دیگران.
      </h2>
    </section>
  );
};

export default Age;
