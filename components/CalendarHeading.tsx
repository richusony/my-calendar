"use client"
import useStore from "@/zustand/store";
import { months } from "@/utils/helper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CalendarHeading() {
    const {currentMonth, currentYear, moveToNextMonth, moveToPrevMonth} = useStore();
    const currentMonthString = months[currentMonth];
    return (
        <div key={`calenderHeading`} className="mt-2 flex justify-center items-center gap-x-4">
            <button key={`leftButton`} onClick={moveToPrevMonth} className="py-2 px-2 text-xl text-gray-500 hover:text-gray-800 font-semibold bg-gray-200 rounded-full"><FaChevronLeft/></button>
            <h1 key={`CalenderHeading`} className="text-xl font-semibold">{currentMonthString} {currentYear}</h1>
            <button key={`rightButton`} onClick={moveToNextMonth} className="py-2 px-2 text-xl text-gray-500 hover:text-gray-800 font-semibold bg-gray-200 rounded-full"><FaChevronRight/></button>
        </div>
    )
}