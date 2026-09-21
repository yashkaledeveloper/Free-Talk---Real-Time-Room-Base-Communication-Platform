import React, { useEffect, useState } from 'react'

const SearchFilter = ({ setParams }) => {
    const [value, setValue] = useState({
        search: "",
        topic: "",
        language: "",
        level: ""
    });

    const handleChange = (e) => {
        setValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setParams(value);
        }, 1000);

        return () => clearTimeout(timer);
    }, [value]);
    return (
        <div className="mx-auto w-[100%]">
            <div className='m-auto w-fit'>
                <div className="w-[70vw] flex items-center justify-center gap-4 m-8 ">

                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <svg
                            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search languages..."
                            name="search"
                            value={value.search}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-blue-100 bg-blue-50/40 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>


                <div className="w-[70vw] flex items-center justify-center gap-4 m-8">

                    <select
                        name="topic"
                        value={value.topic || ""}
                        onChange={handleChange}
                        required
                        className="w-52 rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">Select topic</option>
                        <option value="general">General</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="education">Education</option>
                        <option value="gaming">Gaming</option>
                    </select>

                    {/* Language */}
                    <select
                        className="w-52 rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        name='language'
                        onChange={handleChange}
                        value={value.language || ""}

                    >
                        <option value="">
                            Select Language
                        </option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                    </select>

                    {/* Level */}
                    <select
                        className="w-52 rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        name='level'
                        onChange={handleChange}
                        value={value.level || ""}
                    >
                        <option value="">
                            Language Level
                        </option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                </div>
            </div>
        </div>
    )
}

export default SearchFilter
