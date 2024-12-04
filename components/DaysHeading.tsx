"use client";
import Days from "./Days";
import useStore from "@/zustand/store";
import { weekDays } from "@/utils/helper";

export default function DaysHeading() {
    const { currentMonth, currentYear } = useStore();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth });

    const isSunday = (index: number) => {
        return (index + firstDayOfMonth) % 7 === 0;
    };

    return (
        <div
            key={`DaysHeadingMainContainer`}
            className="mt-10 grid grid-cols-7 gap-x-8 text-center gap-y-6 font-semibold "
        >
            {weekDays.map((day, index) => (
                <div
                    key={`${day}-weekdays`}
                    className={`text-md font-medium ${
                        index === 0 ? `text-red-500` : `text-gray-900`
                    }`}
                >
                    {day}
                </div>
            ))}

            {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} />
            ))}

            {days.map((day, index) => (
                <Days
                    day={day}
                    key={`days-${day}`}
                    index={index}
                    isSunday={isSunday}
                />
            ))}
        </div>
    );
}
