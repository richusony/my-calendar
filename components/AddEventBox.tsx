"use client"

import useStore from "@/zustand/store";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { isValidUrl } from "@/utils/helper";
import axiosInstance from "@/axios.config.js";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { EventType, UserEventType } from "../types/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const AddEventBox = () => {
    const {
        addEventBoxState,
        addEventToggle,
        selectedDate,
        currentMonth,
        currentYear,
        editEventToggle,
        setEditEventData
    } = useStore();
    const [selectedDateEvents, setSelectedDateEvents] = useState<UserEventType[] | null>(null);

    useEffect(() => {
        getSelectedDateEventsIfAny();
    },[selectedDate]);

    const newDate = new Date(currentYear, currentMonth, selectedDate);
    const getSelectedDateEventsIfAny = async () => {
        const selectedDate = {
            dateString: newDate.toLocaleDateString()
        };

        try {
            const { data } = await axiosInstance.post(`/api/get-event`, selectedDate);
            setSelectedDateEvents(data);
        } catch {

        }
    }

    const [formData, setFormData] = useState<EventType>({
        eventName: "",
        eventUrl: null,
        eventTime: null,
        eventDate: newDate.toLocaleDateString()
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Prevent numbers in 'eventName' field
        if (name === "eventName") {
            // Check if the input is purely numeric
            if (/^\d+$/.test(value)) {
                return toast("Event Name cannot be numbers!", { theme: "dark", type: "warning" });
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.eventName) {
            return toast("Event Name is required!!", { theme: "dark", type: "warning" });
        }

        if (typeof formData.eventName !== "string") {
            return toast("Number can't be a Event Name!!", { theme: "dark", type: "warning" });
        }

        if (formData.eventUrl && !isValidUrl(formData.eventUrl)) {
            return toast("Please add a valid URL!!", { theme: "dark", type: "warning" });
        }

        try {
            await axiosInstance.post("/api/add-event", formData);
            return toast("Event Added successfully", { theme: "dark", type: "success" });
        } catch {
            return toast("Something Went Wrong", { theme: "dark", type: "error" });
        }
    }

    const handleEditEvent = async (userEvent: UserEventType) => {
        setEditEventData(userEvent);
        editEventToggle();
    }

    const handleDeleteEvent = async (eventId: number) => {
        const confirm = window.confirm("Are you sure?");
        if(!confirm) return;

        if (!eventId) return toast("eventId is required for deleting", { theme: "dark", type: "warning" });
        try {
           await axiosInstance.delete(`/api/delete-event/` + eventId);
           setSelectedDateEvents(selectedDateEvents?.filter(eve => eve.id !== eventId) || null);
           return toast("Post Deleted Succefully", { theme: "dark", type: "success" });
        } catch {
            return toast("Something went wrong!!", { theme: "dark", type: "error" });
        }
    }

    return (
        <div key={`addEventBox`} className={`pb-10 transition-all delay-300 ease-linear absolute w-full right-0 ${addEventBoxState ? "top-80" : `bottom-full`} min-h-screen rounded-t-xl bg-gray-900 overflow-hidden`}>
            {
                selectedDateEvents &&
                <section className="mt-10 mx-auto px-2 py-2 grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        selectedDateEvents.map((userEvent) => (
                            <div key={`userEvent` + userEvent.id} className={`mx-auto transition-all delay-300 ease-linear px-2 py-2 text-center w-80 border rounded-md text-gray-300 rounded-t-xl bg-gray-900 shadow-md`}>
                                <h1 className="px-1 flex justify-end text-lg"><MdModeEdit onClick={() => handleEditEvent(userEvent)} className="cursor-pointer" /></h1>
                                <h1 className="mb-2 text-xl font-bold">{userEvent?.event_name}</h1>
                                <h1>{userEvent?.event_url}</h1>
                                <input type="time" disabled defaultValue={userEvent?.event_time || ""} name={`event_recieved_time_${userEvent.id}`} id={`event_recieved_time_${userEvent.id}`} className="bg-transparent" />
                                <h1 className="px-1 flex justify-end text-lg"><MdDelete onClick={() => handleDeleteEvent(userEvent.id)} className="cursor-pointer" /></h1>
                            </div>
                        ))
                    }
                </section>
            }

            <h1 className="mt-5 text-2xl font-semibold text-gray-300 text-center">Add Event</h1>
            <span onClick={addEventToggle} className="absolute top-4 right-4 text-white text-3xl cursor-pointer"><IoCloseSharp /></span>

            <form onSubmit={handleSubmit} className="mt-5 mx-auto border-2 px-4 py-5 md:w-1/2 rounded-md shadow-md">
                <div className="flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="eventName">Event</label>
                    <input className="px-2 py-2 rounded-md" onChange={handleInputChange} type="text" name="eventName" id="eventName" placeholder="eg: My Birthday, Meeting, Dinner with Girlfriend" />
                </div>
                <div className="mt-5 flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="eventUrl">URL</label>
                    <input className="px-2 py-2 rounded-md" onChange={handleInputChange} type="text" name="eventUrl" id="eventUrl" placeholder={`eg: "https://meet.google.com/xyz" (Optional)`} />
                </div>
                <div className="mt-5 flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="eventTime">Time</label>
                    <input className="px-2 py-2 rounded-md" onChange={handleInputChange} type="time" name="eventTime" id="eventTime" placeholder={`eg: "https://meet.google.com/xyz" (Optional)`} />
                </div>
                <div className="mt-10">
                    <button type="submit" className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-md">Add</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
export default AddEventBox;