"use client";

import React from "react";
import ScrollReveal from "../../../../Reactbits/ScrollReveal/ScrollReveal";

export default function Sentence() {

  return (
    <div className="lg:h-[250vh] md:h-[175vh] h-[170vh] bg-black flex justify-center items-center">
      <div className="lg:text-5xl md:text-4xl text-lg font-normal font-pixel text-neutral-300">
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        containerClassName="flex items-center justify-center h-full"
        textClassName="text-justify max-w-xs md:max-w-3xl lg:max-w-5xl mx-auto leading-loose"
      >
          "The road isn’t straight. It twists, it breaks, it hurts. But as long as you keep moving, you're still alive in the fight — still becoming stronger."
      </ScrollReveal>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        containerClassName="flex items-center justify-center h-full"
        textClassName="text-justify py-20 max-w-xs md:max-w-3xl lg:max-w-5xl mx-auto leading-loose"
      >
          "Muhammad Hafizh Zikry, 2025"
      </ScrollReveal>
      </div>
    </div>
  );
}