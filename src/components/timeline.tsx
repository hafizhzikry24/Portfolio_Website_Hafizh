import React from "react";
import { Timeline } from "./ui/timeline";
import { useInView } from "react-intersection-observer"; // Import useInView

export function TimelineDemo() {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false, // Trigger animation once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  const data = [
    {
      title: "PT. Awan Network Indonesia",
      content: (
        <div>
          <p className="text-neutral-500 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
            Aug 2024 - Nov 2024
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs text-justify md:text-base font-normal mb-16">
            As a Backend Developer at PT Awan Network Indonesia, I developed and optimized APIs for seamless integration between the application and the website with my team. My responsibilities included ensuring efficient backend performance, implementing scalable solutions, and collaborating with cross-functional teams to deliver a robust and secure platform that enhances user interaction and functionality.
          </p>
        </div>
      ),
    },
    {
      title: "Diponegoro University",
      content: (
        <div>
          <p className="text-neutral-500 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
            Aug 2024 - Nov 2024
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs text-justify md:text-base font-normal mb-16">
            During my studies I took the opportunity to become a practicum assistant, I taught: Assistant practicum of Digital System Class, Assistant practicum of Introduction To Network Class, Assistant practicum of Advanced Digital Systems Lanjut Lanjut Class, Assistant practicum of Switching, routing and wireless essentials Class, Assistant practicum of Automation and Control Systems Practical Class.
          </p>
        </div>
      ),
    },
    {
      title: "MTQMN XVII at Malang",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-xl font-semibold ">
            {/* Optional title content */}
          </p>
          <p className="text-neutral-500 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
            Nov 2023
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs text-justify md:text-base font-normal mb-16">
            Won first place in the Diponegoro University MTQM Al-Qur'an Application Design competition, representing the university at the National MTQM at Brawijaya University, Malang. Our team, out of 50 university representatives, presented the Quran Application Design and finished in the top 18.
          </p>
        </div>
      ),
    },
    {
      title: "SMKN 53 Jakarta",
      content: (
        <div>
          <p className="text-neutral-500 dark:text-neutral-200 text-xs md:text-base font-normal mb-8">
            Jan 2023 - Feb 2023
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs text-justify md:text-base font-normal mb-16">
            Carrying out network design or what is known as network architecture, installing and configuring the network design then monitoring the network to ensure that the network does not experience problems, troubleshooting which is carried out when interference or problems are found on a network and documentation is useful for reports and also makes the subsequent troubleshooting process easier.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div
        ref={inViewRef} // Attach inViewRef here
        className={`transition-all duration-1000 ease -in-out transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} // Apply animation classes
      >
        <Timeline data={data} />
      </div>
    </div>
  );
}