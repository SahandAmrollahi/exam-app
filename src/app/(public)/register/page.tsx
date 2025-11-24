"use client";
import Button from "@/components/auth/Button/Button";
import Header from "@/components/auth/Header/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const signUp = () => {
    router.push("/register/phone");
  };
  const signIn = () => {
    router.push("/login/login");
  };
  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-[352px] flex-col items-center overflow-hidden pt-20">
      <div className="mt-7">
        <Header />
      </div>
      <Image
        className="container w-[345px] h-[410px] border-none mb-7 object-cover"
        src="/assets/svg/Boarding.svg"
        alt="Register"
        width={344}
        height={420}
      />
      <div className="fixed bottom-20">
        <Button text="ثبت نام" onClick={signUp} />
        <Button
          text="ورود"
          onClick={signIn}
          backgroundColor="bg-[#933147] text-[#F5F5F5]"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
