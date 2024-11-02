import React, { memo, useCallback, useEffect, useRef } from "react";
import Booking from "@/app/assets/booking-logo.png";
import Spotify from "@/app/assets/spotify-logo.png";
import Google from "@/app/assets/google-logo.png";
import Stripe from "@/app/assets/stripe-logo.png";

const imgData = [
  { id: 1, imgSrc: Booking, altText: "booking" },
  { id: 3, imgSrc: Google, altText: "google" },
  { id: 2, imgSrc: Spotify, altText: "spotify" },
  { id: 4, imgSrc: Stripe, altText: "stripe" },
];

const BrandSlider: React.FC = () => {
  const imgRow = useRef<HTMLDivElement>(null);

  const scrollRow = useCallback(() => {
    const row = imgRow.current;

    if (row) {
      row.scrollLeft += 1;

      if (row.scrollLeft >= row?.scrollWidth / 2) {
        row.scrollLeft = 10;
      }
    }
  }, []);

  useEffect(() => {
    const rowInterval = setInterval(scrollRow, 20);

    return () => {
      clearInterval(rowInterval);
    };
  }, [scrollRow]);

  return (
    <article className="size-full flexColCenter items-center">
      <div
        ref={imgRow}
        className="size-full flex items-center flex-nowrap overflow-x-hidden gap-14 flex-shrink-0"
      >
        {[...imgData, ...imgData].map((item, index) => {
          return (
            <img
              key={index}
              src={item.imgSrc}
              alt={item.altText}
              aria-label={item.altText}
              loading="lazy"
              decoding="async"
              className="w-24 h-full max-h-24 drop-shadow-md aspect-auto object-cover"
            />
          );
        })}
      </div>
    </article>
  );
};

const MemoBrandSlider = memo(BrandSlider);

export default MemoBrandSlider;
