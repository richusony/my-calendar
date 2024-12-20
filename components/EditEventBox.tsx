"use client"

import axios from "axios";
import useStore from "@/zustand/store";
import { toast } from "react-toastify";
import { isValidUrl } from "@/utils/helper";
import { IoCloseSharp } from "react-icons/io5";
import { ChangeEvent, FormEvent, useState } from "react";

const EditEventBox = () => {
    const { editEventToggle, editEventData } = useStore();
    const [formData, setFormData] = useState({
        event_name: editEventData?.event_name || "",
        event_url: editEventData?.event_url || "",
        event_time: editEventData?.event_time || "",
        event_date: editEventData?.event_date || "",
        id: editEventData?.id || null,
        user_id: editEventData?.user_id || null
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.event_name) {
            return toast("Event Name is required!!", { theme: "dark", type: "warning" });
        }

        if (typeof formData.event_name !== "string") {
            return toast("Number can't be a Event Name!!", { theme: "dark", type: "warning" });
        }

        if (formData.event_url && !isValidUrl(formData.event_url)) {
            return toast("Please add a valid URL!!", { theme: "dark", type: "warning" });
        }

        try {
            await axios.post("https://my-calendar-nqs6.onrender.com/api/edit-event", formData);
            toast("Event edited successfully", { theme: "dark", type: "success" });
            return window.location.reload();
        } catch {
            return toast("Something Went Wrong", { theme: "dark", type: "error" });
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Prevent numbers in 'eventName' field
        if (name === "event_name") {
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

    return (
        <div className="px-2 py-4 absolute top-0 right-0 h-full w-full bg-black bg-opacity-60">
            <span onClick={editEventToggle} aria-label="Close Edit Event Box" className="px-2 flex justify-end text-white font-bold text-3xl cursor-pointer"><IoCloseSharp /></span>

            <form onSubmit={handleSubmit} className="mt-5 mx-auto border-2 px-4 py-5 md:w-1/2 bg-gray-900 rounded-md shadow-md">
                <div className="flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="event_name">Event</label>
                    <input className="px-2 py-2 rounded-md" value={formData?.event_name} onChange={handleInputChange} type="text" name="event_name" id="event_name" placeholder="eg: My Birthday, Meeting, Dinner with Girlfriend" />
                </div>
                <div className="mt-5 flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="event_url">URL</label>
                    <input className="px-2 py-2 rounded-md" value={formData?.event_url || ""} onChange={handleInputChange} type="text" name="event_url" id="event_url" placeholder={`eg: "https://meet.google.com/xyz" (Optional)`} />
                </div>
                <div className="mt-5 flex flex-col">
                    <label className="mb-2 text-xl text-white" htmlFor="event_time">Time</label>
                    <input className="px-2 py-2 rounded-md" value={formData?.event_time || ""} onChange={handleInputChange} type="time" name="event_time" id="event_time" placeholder={`eg: "https://meet.google.com/xyz" (Optional)`} />
                </div>
                <div className="mt-10">
                    <button type="submit" className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-md">Save</button>
                </div>
            </form>
        </div>
    )
}
export default EditEventBox;