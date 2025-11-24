"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface IntervalProps {
  min: number;
  max: number;
  onChange?: (value: string) => void;
  initialText?: string;
}

type Bucket = { start: number; end: number; label: string; isBeyond?: boolean };

const Interval: React.FC<IntervalProps> = ({
  min,
  max,
  onChange,
  initialText,
}) => {
  const NUM_BARS = 63;
  const THRESHOLD = 25;

  const buckets: Bucket[] = useMemo(
    () => [
      { start: 7, end: 9, label: "7 تا 9 سال" },
      { start: 10, end: 12, label: "10 تا 12 سال" },
      { start: 13, end: 15, label: "13 تا 15 سال" },
      { start: 16, end: 18, label: "16 تا 18 سال" },
      { start: 19, end: 24, label: "19 تا 24 سال" },
      { start: 25, end: max, label: "بیش از 25 سال", isBeyond: true },
    ],
    [max]
  );

  const [pct, setPct] = useState(0);
  const [thumbLeftPx, setThumbLeftPx] = useState(0);

  const [startBar, setStartBar] = useState(0);
  const [endBar, setEndBar] = useState(0);

  const [floorValue, setFloorValue] = useState(min);
  const [ceilValue, setCeilValue] = useState(min);
  const [label, setLabel] = useState<string>("");

  const [touched, setTouched] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const [isRTL, setIsRTL] = useState(false);
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const rtlAncestor = el.closest('[dir="rtl"]');
    if (rtlAncestor) setIsRTL(true);
    else if (typeof document !== "undefined") setIsRTL(document.dir === "rtl");
  }, []);

  const totalRange = Math.max(0, max - min);

  const valueToIndex = useCallback(
    (v: number) => {
      if (totalRange <= 0) return 0;
      const pct = (v - min) / totalRange;
      return Math.max(0, Math.min(NUM_BARS - 1, Math.round(pct * NUM_BARS)));
    },
    [min, totalRange]
  );

  const pickBucket = useCallback(
    (v: number): Bucket => {
      if (v >= THRESHOLD) return buckets[buckets.length - 1];

      for (const b of buckets) {
        if (b.isBeyond) continue;
        if (b.start === 15 && v === 15) return b;
      }
      for (const b of buckets) {
        if (b.isBeyond) continue;
        if (v >= b.start && v <= b.end) return b;
      }
      let best = buckets[0];
      for (const b of buckets) {
        if (b.isBeyond) continue;
        if (v >= b.start) best = b;
      }
      return best;
    },
    [buckets]
  );

  const maxPct = 1;

  const layoutFromPct = useCallback(
    (newPctLTR: number) => {
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!track || !thumb) return;

      const { width: trackW } = track.getBoundingClientRect();
      const thumbW = thumb.getBoundingClientRect().width;

      const clampedPct = Math.max(0, Math.min(newPctLTR, maxPct));
      setPct(clampedPct);

      const visualPctFromLeft = isRTL ? 1 - clampedPct : clampedPct;

      const triPx = visualPctFromLeft * trackW;
      const halfThumb = thumbW / 2;
      const overshoot = thumbW / 7;
      const desiredLeft = Math.max(
        -overshoot,
        Math.min(triPx - halfThumb, trackW - thumbW + overshoot)
      );
      setThumbLeftPx(desiredLeft);

      const rawVal = Math.round(min + clampedPct * totalRange);

      const b = pickBucket(rawVal);

      setFloorValue(b.start);
      setCeilValue(b.end);
      setLabel(b.label);
      onChange?.(String(b.start));

      const sIdx = b.isBeyond ? valueToIndex(THRESHOLD) : valueToIndex(b.start);
      const eIdx = b.isBeyond ? NUM_BARS - 1 : valueToIndex(b.end);
      setStartBar(sIdx);
      setEndBar(eIdx);
    },
    [isRTL, maxPct, min, totalRange, pickBucket, valueToIndex, onChange]
  );

  const updatePctFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const { left, width } = track.getBoundingClientRect();
      if (width <= 0) return;

      let x = clientX - left;
      x = Math.max(0, Math.min(x, width));
      let rawPct = x / width;

      if (isRTL) rawPct = 1 - rawPct;
      layoutFromPct(rawPct);
    },
    [isRTL, layoutFromPct]
  );

  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updatePctFromClientX(e.clientX);
    };
    const onMouseUp = () => {
      dragging.current = false;
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [updatePctFromClientX]);


  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updatePctFromClientX(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      dragging.current = false;
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [updatePctFromClientX]);

  useEffect(() => {
    layoutFromPct(pct);
  }, [isRTL]);

  useLayoutEffect(() => {
    layoutFromPct(0);
  }, [isRTL, min, max, totalRange]);

  const startDrag = (clientX: number) => {
    dragging.current = true;
    if (!touched) setTouched(true);
    updatePctFromClientX(clientX);
  };
  const onMouseDownThumb = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX);
  };
  const onMouseDownTrack = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX);
  };
  const onTouchStartThumb = (e: React.TouchEvent) => {
    e.preventDefault();
    startDrag(e.touches[0].clientX);
  };
  const onTouchStartTrack = (e: React.TouchEvent) => {
    e.preventDefault();
    startDrag(e.touches[0].clientX);
  };

  const tooltipText = label || `${floorValue} تا ${ceilValue} سال`;
  const nudgePx = touched ? 0 : 12;

  return (
    <div className="mt-[100px]">
      <div
        ref={trackRef}
        className="relative w-[349.17px]"
        onMouseDown={onMouseDownTrack}
        onTouchStart={onTouchStartTrack}
      >
        <div
          ref={thumbRef}
          onMouseDown={onMouseDownThumb}
          onTouchStart={onTouchStartThumb}
          className="min-w-[86px] w-fit h-11 bg-[#933147] rounded-[7px] absolute p-2 flex justify-center items-center bottom-2 select-none cursor-grab active:cursor-grabbing"
          style={{
            left: `${thumbLeftPx}px`,
            transform: `translateX(${nudgePx}px)`,
          }}
        >
          <p className="font-peyda font-normal text-[14px] leading-4 flex items-center text-center text-[#DBDBDB]">
            {touched
              ? tooltipText
              : initialText ?? "برای انتخاب بازهٔ سنی، همین اهرم را بکشید"}
          </p>
        </div>

        <div
          className="absolute border-solid border-t-[9px] border-x-[9px] border-b-0 border-t-[#933147] border-x-transparent"
          style={{
            bottom: 0,
            left: `${(isRTL ? 1 - pct : pct) * 100}%`,
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div>
        <div
          className={`flex w-[349.17px] border-none justify-center items-center mt-[11px] ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {Array.from({ length: NUM_BARS }).map((_, i) => {
            const logicalIndex = isRTL ? NUM_BARS - 1 - i : i;
            const active = logicalIndex >= startBar && logicalIndex <= endBar;

            return (
              <div
                key={`bar-${i}`}
                className={`h-[52px] w-0 border-[0.76px] border-solid mx-0.5 ${
                  active ? "border-[#933147]" : "border-[#F9C74F]"
                }`}
              />
            );
          })}
        </div>

        <div className="relative w-[349.17px] mt-[3px]">
          <span className="absolute -left-3 font-peyda font-medium text-[12.7px] leading-[19px] text-[#FFFFFF]">
            {max}
          </span>
          <span className="absolute -right-3 font-peyda font-medium text-[12.7px] leading-[19px] text-[#FFFFFF]">
            {min}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Interval;
