"use client"
import useStore from "@/zustand/store";

export default function Days({ day, index, isSunday }: { day: number, index: number, isSunday: (index: number) => boolean }) {
    const { currentDate, addEventToggle } = useStore();
    const currentDayStyle = currentDate === day ? isSunday(index) ? `bg-red-500 text-white` : `bg-gray-900 text-white` : `bg-white text-gray-900`
    return (
            <button onClick={addEventToggle} className={`h-9 w-9 md:h-12 md:w-12 text-xl ${isSunday(index) ? `text-red-500` : ``
                } ${currentDayStyle} rounded-full shadow-md`}>
                {day}
            </button>
    )
}