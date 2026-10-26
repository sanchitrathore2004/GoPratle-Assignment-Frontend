"use client"

import {useState} from 'react';
import EventBasics from "@/components/EventBasics";
import EventPlanner from "@/components/EventPlanner";
import Performer from "@/components/Performer";
import Crew from "@/components/Crew";
import EventPlannerAdditional from "@/components/EventPlannerAdditional";
import PerformerAdditional from "@/components/PerformerAdditional";
import CrewAdditional from "@/components/CrewAdditional";
import ReviewAndSave from "@/components/ReviewAndSave";

type Data = {
  category: string,
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState<Partial<Data>>({});

  const onNext = (data: any) => {
    setEventData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev+1);
  }

  const chooseHeading = () => {
    if(step === 1 ) return "Event Basics";
    if(step === 2 && eventData && eventData.category === "Event Planner") return "Event Planner Details";
    if(step === 2 && eventData && eventData.category === "Performer") return "Performer Details";
    if(step === 2 && eventData && eventData.category === "Crew") return "Crew Details";
    if(step === 3 && eventData && eventData.category === "Event Planner") return "Additional Event Planner Details";
    if(step === 3 && eventData && eventData.category === "Performer") return "Additional Performer Details";
    if(step === 3 && eventData && eventData.category === "Crew") return "Additional Crew Details";
    if(step === 4) return "Review and Save";
  }

  const handleSubmit = () => {
    console.log(eventData);
  }
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
            {chooseHeading()}
          </h1>
        </div>
        {step === 1 && (
        <EventBasics
          onNext={onNext}/>
      )}
      {step === 2 && eventData && eventData.category === "Event Planner" && (
        <EventPlanner onNext={onNext}/>
      )}
      {step === 2 && eventData && eventData.category === "Performer" && (
        <Performer onNext={onNext}/>
      )}
      {step === 2 && eventData && eventData.category === "Crew" && (
        <Crew onNext={onNext}/>
      )}
      {step === 3 && eventData && eventData.category === "Event Planner" && (
        <EventPlannerAdditional onNext={onNext}/>
      )}
      {step === 3 && eventData && eventData.category === "Performer" && (
        <PerformerAdditional onNext={onNext}/>
      )}
      {step === 3 && eventData && eventData.category === "Crew" && (
        <CrewAdditional onNext={onNext}/>
      )}
      {step === 4 && (
        <ReviewAndSave data={eventData} handleSubmit={handleSubmit} />
      )}
      </div>
    </div>
  );
}