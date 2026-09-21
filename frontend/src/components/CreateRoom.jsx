import { useState } from "react";
import api from "../services/api";

const CreateRoom = ({ onCreateRoom }) => {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        topic: "",
        language: "",
        level: "",
        maxUsers: 10,
        isPrivate: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setOpen(false);

            await api.post('/rooms/', { ...form });
            
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed right-5 bottom-5 rounded-lg bg-blue-600 px-2 py-1.5 
                text-sm font-medium text-white hover:bg-blue-700 rounded-full"
            >

                <span class="material-symbols-outlined">
                    add
                </span>

            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                        {/* Header */}
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Create Room
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-xl text-gray-400 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name */}
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Room name"
                                required
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />

                            {/* Description */}
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Description"
                                rows={3}
                                required
                                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />

                            {/* Topic */}
                            <select
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="">Select topic</option>
                                <option value="General">General</option>
                                <option value="Technology">Technology</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Gaming">Gaming</option>
                            </select>

                            {/* Language */}
                            <select
                                name="language"
                                value={form.language}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="">Select language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>

                            {/* Level */}
                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="">Select level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            {/* Max Users */}
                            <input
                                type="number"
                                name="maxUsers"
                                value={form.maxUsers}
                                onChange={handleChange}
                                min="2"
                                max="100"
                                placeholder="Maximum users"
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />

                            {/* Private */}
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="isPrivate"
                                    checked={form.isPrivate}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-blue-600"
                                />
                                Private room
                            </label>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Create Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateRoom;