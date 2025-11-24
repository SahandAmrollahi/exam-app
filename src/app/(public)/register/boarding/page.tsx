"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/auth/Button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRegistration } from "@/context/register/RegisterContext";

const images = [
  "/assets/svg/Boarding1.svg",
  "/assets/svg/Boarding2.svg",
  "/assets/svg/Boarding3.svg",
];

const width = 352;
const height = 358;

const boarding = {
  "boarding-header": [
    "آزمون بساز،\nچالش درست کن!",
    "بازی کن،\nیاد بگیر!",
    "امتیاز بگیر،\nبرتر شو!",
  ],
  "boarding-description": [
    "خودت می‌تونی آزمون بسازی تا دوستات، کلاس یا حتی بقیه توش شرکت کنن. موضوعش هم دست خودته!",
    "می‌تونی تو بخش دیسکاور دنبال آزمونا بگردی، یا با یه پین‌کد ساده، توی چالشِ بقیه شرکت کنی!",
    "تو هر موضوعی که دوست داری، بازی کن و امتیاز بگیر!\n رتبه‌ت توی جدول رقابت بالا ببر و بدرخش!",
  ],
};

const Boarding: React.FC = () => {
  const { state } = useRegistration();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    setDragX(e.clientX - startX.current);
  }

  function goToPage(nextIndex: number) {
    if (nextIndex === page) return;

    setTimeout(() => {
      setPage((nextIndex + images.length) % images.length);
    }, 180);
  }

  function onPointerUp() {
    if (!isDragging) return;
    const threshold = (containerRef.current?.offsetWidth ?? width) / 3;

    if (dragX < -threshold) {
      goToPage(page + 1);
    } else if (dragX > threshold) {
      goToPage(page - 1);
    }

    setDragX(0);
    setIsDragging(false);
  }

  const translate = -page * width + (isDragging ? dragX : 0);

  const transformTransition = isDragging ? "none" : "transform 0.5s ease";
  const opacityTransition = "opacity 200ms ease";
  const trackTransition = isDragging
    ? opacityTransition
    : `${opacityTransition}, ${transformTransition}`;

  const handleSend = async () => {
    try {
      const res = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      console.log("bbinim chi shd", res);
      const data = await res.json();
      console.log("hello data :)", data);
      window.localStorage.setItem("accessToken", data?.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  const nextButton = async () => {
    if (page === images.length - 1) {
      await handleSend();
    } else {
      goToPage(page + 1);
    }
  };
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <section className="flex flex-col items-center">
      <div className="flex items-center justify-center w-full flex-col">
        <div ref={containerRef} className="w-[352px] overflow-hidden relative">
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{
              display: "flex",
              transform: `translateX(${translate}px)`,
              transition: trackTransition,
              willChange: "transform, opacity",
            }}
          >
            {images.map((src, i) => (
              <div
                key={`key-${i + 1}`}
                style={{ minWidth: width, height }}
                className="flex items-center justify-center"
              >
                <Image
                  src={src}
                  width={width}
                  height={height}
                  priority={i === page}
                  loading={i === page ? "eager" : "lazy"}
                  alt={`slide ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          {images.map((_, i) => (
            <button
              key={`btn-${i + 1}`}
              type="button"
              onClick={() => goToPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={
                i === page
                  ? "w-4 h-2 bg-[#F9C74F] rounded-[19px] transform -scale-x-100 mx-[3px]"
                  : "w-[37px] h-2 bg-[#DBDBDB] rounded-[19px] transform -scale-x-100 mx-[3px]"
              }
            />
          ))}
        </div>
      </div>

      <h1
        className="whitespace-pre-line h-[82px] w-[338px] font-peyda font-bold text-[34px] leading-[41px] text-center flex items-center justify-center text-white mt-[22px] mb-2"
        dir="rtl"
        style={{
          transition: opacityTransition,
          willChange: "opacity",
        }}
      >
        {boarding["boarding-header"][page]}
      </h1>

      <h3
        className="whitespace-pre-line w-[338px] h-10 text-[14px] leading-5 font-peyda font-normal text-center text-[#CACACA] flex items-center justify-center mb-[27px]"
        dir="rtl"
        style={{
          transition: opacityTransition,
          willChange: "opacity",
        }}
      >
        {boarding["boarding-description"][page]}
      </h3>

      <Button
        text={page === images.length - 1 ? "بزن بریم!" : "بعدی"}
        onClick={nextButton}
      />
    </section>
  );
};

export default Boarding;
