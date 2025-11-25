"use client";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const params = useSearchParams();
  const message=params.get("message")

  return (
    <section className="flex flex-col items-center">
      <h1
        className="w-[343px] h-10 font-peyda font-bold text-[24px] leading-10 flex justify-center items-center text-center text-white mt-11"
        dir="rtl"
      >
        {message ?? "به صفحه خانه خوش اومدی"} 🙂
      </h1>
    </section>
  );
};

export default Home;
