import { create } from "zustand";

const date = new Date();
const currentDate = date.getDay() + 1;
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

interface CalendarState {
    currentDate: number;
    currentMonth: number;
    currentYear: number;
    addEventBoxState: boolean;
    selectedDate: number;
    moveToNextMonth: () => void;
    moveToPrevMonth: () => void;
    moveToNextYear: () => void;
    moveToPrevYear: () => void;
    addEventToggle: () => void;
    handleSelectedDate: (day:number) => void;
}

const useStore = create<CalendarState>((set) => ({
    currentDate: currentDate,
    currentMonth: currentMonth,
    currentYear: currentYear,
    addEventBoxState: false,
    selectedDate:currentDate,
    moveToNextMonth: () => set((state) => {
        if (state.currentMonth >= 11) {
            return { currentMonth: 0, currentYear: state.currentYear + 1 };
        } else {
            return { currentMonth: state.currentMonth + 1 }
        }
    }),
    moveToPrevMonth: () => set((state) => {
        if (state.currentMonth <= 0) {
            return { currentMonth: 11, currentYear: state.currentYear - 1 };
        } else {
            return { currentMonth: state.currentMonth - 1 }
        }
    }),
    moveToNextYear: () => set((state) => ({ currentYear: state.currentYear + 1 })),
    moveToPrevYear: () => set((state) => ({ currentYear: state.currentYear - 1 })),
    addEventToggle: () => set((state) => ({ addEventBoxState: !state.addEventBoxState })),
    handleSelectedDate: (day) => set((state) => ({selectedDate: day}))
}));


export default useStore