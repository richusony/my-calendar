import DaysHeading from "./DaysHeading";
import AddEventBox from "./AddEventBox";
import CalendarHeading from "./CalendarHeading";

export default function Calendar() {

  return (
    <div className="mt-5 p-5 bg-gray-100 rounded-lg shadow-xl">
        <CalendarHeading />
        <DaysHeading />
        <AddEventBox />
    </div>
  )
}