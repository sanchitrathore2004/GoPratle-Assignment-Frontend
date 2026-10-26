"use client"

import {useState} from 'react';
import EventBasics from "@/components/EventBasics";
import EventPlanner from "@/components/EventPlanner";
import Performer from "@/components/Performer";
import Crew from "@/components/Crew";

type Data = {
  name: string,
  type: string,
  date: string,
  endDate: string,
  location: string,
  venue: string,
  category: string,
  services: string,
  guestCount: string | number,
  budget: string | number,
  stage: string,
  description: string,
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState<Partial<Data>>();
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto mt-[2.5vw] flex h-[160px] w-[90%] items-center">
        <div className="flex h-[80%] w-[75%] items-center bg-[#e02d4b] pl-[4vw] text-5xl font-bold text-white">
          Eventlyst
        </div>

        <div className=" h-full w-[25%] bg-[#ad1c21] [clip-path:polygon(20%_0,100%_0,100%_100%,20%_100%,0_50%)] -ml-15" />
      </div>

      <div className="mx-auto w-[90%] max-w-3xl py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#e02d4b]">
            Step {step} of 4
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Event Basics
          </h1>
        </div>
        {step === 1 && (
        <EventBasics
          onNext={(data) => {
            console.log(data);
            setEventData((prev) => ({ ...prev, ...data }));
            setStep(2);
          }}
        />
      )}
      {step === 2 && eventData && eventData.category === "Event Planner" && (
        <EventPlanner onNext={(data) => {
            console.log(data);
            setEventData((prev) => ({ ...prev, ...data }));
            setStep(3);
          }}
        />
      )}
      {step === 2 && eventData && eventData.category === "Performer" && (
        <Performer onNext={(data) => {
            console.log(data);
            setEventData((prev) => ({ ...prev, ...data }));
            setStep(3);
          }}
        />
      )}
      {step === 2 && eventData && eventData.category === "Crew" && (
        <Crew onNext={(data) => {
            console.log(data);
            setEventData((prev) => ({ ...prev, ...data }));
            setStep(3);
          }}
        />
      )}
      </div>
    </div>
  );
}