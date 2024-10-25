import React from "react";
import { Compare } from "./ui/compare";

export function CompareDemo() {
  return (
    <div className="h-[100vh] p-4   dark:bg-neutral-900 bg-neutral-900 px-4">
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


