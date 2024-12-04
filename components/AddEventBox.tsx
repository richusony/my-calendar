"use client"
import useStore from "@/zustand/store";
import {IoCloseSharp} from "react-icons/io5";

const AddEventBox = () => {
    const { addEventBoxState, addEventToggle } = useStore();
    return (
        <div key={`addEventBox`} className={`transition-all delay-300 ease-linear absolute w-full right-0 ${addEventBoxState ? "top-80" : `bottom-full`} h-screen rounded-t-xl bg-gray-900`}>
            <h1 className="mt-5 text-2xl font-semibold text-gray-300 text-center">Add Event</h1>
            <span onClick={addEventToggle} className="absolute top-4 right-4 text-white text-3xl cursor-pointer"><IoCloseSharp/></span>

            <form className="mt-5 mx-auto border-2 px-4 py-5 md:w-1/2 rounded-md shadow-md">
                <div className="flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="eventName">Event</label>
                    <input className="px-2 py-2 rounded-md" type="text" name="eventName" id="eventName" placeholder="eg: My Birthday, Meeting, Dinner with Girlfriend" />
                </div>
                <div className="mt-5 flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="eventUrl">URL</label>
                    <input className="px-2 py-2 rounded-md" type="text" name="eventUrl" id="eventUrl" placeholder={`eg: "https://meet.google.com/xyz" (Optional)`} />
                </div>
                <div className="mt-10">
                    <button type="submit" className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-md">Add</button>
                </div>
            </form>
        </div>
    )
}
export default AddEventBox;