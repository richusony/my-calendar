"use client" 
import useStore from "@/zustand/store";
import { lazy, Suspense } from "react";
import DaysHeading from "./DaysHeading";
import CalendarHeading from "./CalendarHeading";

// Lazy loading Components
const AddEventBox = lazy(() => import("./AddEventBox"));
const EditEventBox = lazy(() => import("./EditEventBox"));

export default function Calendar() {
  const { addEventBoxState, editEventBoxState } = useStore();
  return (
    <div className="mt-5 p-5 bg-gray-100 rounded-lg shadow-xl">
      <CalendarHeading />
      <DaysHeading />
      <Suspense fallback={"Loading..."}>
        {addEventBoxState && <AddEventBox />}
      </Suspense>
      <Suspense fallback={"Loading..."}>
        {editEventBoxState && <EditEventBox />}
      </Suspense>
    </div>
  )
}