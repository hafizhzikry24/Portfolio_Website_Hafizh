"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { Compare } from "./ui/compare";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-black">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-200 bg-clip-text text-transparent">
              Unlock the potential <br />
              <span className="text-4xl sm:text-7xl md:text-7xl lg:text-[6rem] font-bold mt-1 leading-none">
                Animations Scroll
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://freefrontend.com/assets/img/tailwind-dashboards/dashboard-ui.jpg"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <Compare
        firstImage="https://assets.aceternity.com/code-problem.png"
        secondImage="https://assets.aceternity.com/code-solution.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
    </div>
  );
}
