import React from "react";
import Marquee from "react-fast-marquee";

export default function LogoMarquee({
  logos = [],
  label = "",
  className = "",
  speed = 40,
  gradient = false,
  gradientWidth = 0,
  pauseOnHover = true,
  border = false,
  rounded = true,
  paddingY = "py-4",
  itemClassName = "",
  duplicate = true,
}) {
  if (!logos.length) return null;

  const items = duplicate ? [...logos, ...logos] : logos;

  return (
    <div className={className}>
      {label && (
        <p className="text-center text-sm text-black/40 dark:text-white/40 mb-4">
          {label}
        </p>
      )}
      <div className={`${paddingY} ${border ? "border-y border-black/5 dark:border-white/10" : ""} ${rounded ? "rounded-2xl" : ""}`}>
        <Marquee speed={speed} gradient={gradient} gradientWidth={gradientWidth} pauseOnHover={pauseOnHover}>
          {items.map((logo, idx) => (
            <img key={idx} src={logo.src} alt={logo.alt || ""} className={`h-8 mx-8 opacity-40 hover:opacity-100 transition grayscale hover:grayscale-0 ${itemClassName}`} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
