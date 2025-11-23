import React from "react";

const Header: React.FC = () => {
  return (
    <div className="container w-[345px] h-[130px] border-none mb-[22px] mt mt-[-41px]">
      <h1 className="w-[338px] h-[82px] font-peyda font-bold text-[34px] leading-[41px] mb-2 text-center text-[#F5F5F5] self-stretch select-none">
        آزمون
        <br />
        خود را بسازید
      </h1>
      <h3
        className="w-[338px] h-10 font-peyda font-normal text-[14px] leading-5 text-center text-[#CACACA] order-1 self-stretch select-none"
        dir="rtl"
      >
        برای ساخت آزمون، برگزاری در کلاس یا تعیین آن به‌عنوان تکلیف، و مشاهده
        گزارش عملکرد، وارد شوید یا ثبت‌نام کنید.
      </h3>
    </div>
  );
};

export default Header;
