"use client"
import React from 'react'
import { useState } from 'react'
import { IoSearch } from "react-icons/io5";

function Queries() {
    const [activeState, setActiveState] = useState<string | null>("All");
    const [searchType, setSearchType] = useState('Vendor Name');
    const [searchText, setSearchText] = useState('');

    const handleButtonClick = (buttonName: string) => {
        setActiveState(buttonName);
    }

    const buttonLabels = ['All', 'Open', 'Awaiting Approval', 'Approved', 'Processing', 'Paid', 'Rejected', 'Vendor Not Found', 'Duplicate', 'Void'];

    const baseClass = "p-2 text-gray-800  hover:font-bold border-b-4 transition-all"
    return (
        <div>
            <div className=" flex justify-around">
                {
                    buttonLabels.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(label)}
                            className={`${baseClass} ${activeState === label ? "border-[#273746]" : "border-transparent"}`}>
                            <p className='text-sm'>{label}</p>
                        </button>
                    ))
                }

            </div>
            <hr className="h-px  border-0 bg-gray-500" />

            <div className="px-16 py-2 flex justify-around w-full">

                <div className="flex justify-between items-center w-2/5 max-w-4xl bg-gray-100 rounded-[9px] border-2 border-gray-600">
                    <div className="flex items-center space-x-4 bg-[#d5d8dc] p-1 rounded-l-lg ml-[0.4px]">
                        <IoSearch size={22} />
                        <select
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="text-sm bg-transparent rounded-lg text-gray-700 focus:outline-none">
                            <option value="Vendor Name">Vendor Name</option>
                            <option value="Invoice Number">Invoice Number</option>
                            <option value="Date">Date</option>
                            <option value="Status">Status</option>
                            <option value="Amount">Amount</option>
                        </select>
                    </div>

                    {/* Vertical Divider */}
                    <div className="border-l-2 border-gray-300 h-full"></div> {/* Vertical Divider */}

                    {/* Right Section: Input Field */}
                    <input
                        type="text"
                        className="outline-none text-sm bg-transparent flex-1 p-1 text-gray-700"
                        placeholder="Search..."/>
                </div>
                <div>
                <select
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-transparent text-sm rounded-lg text-gray-700 focus:outline-none">
                            <option value="Vendor Name">Vendor Name</option>
                            <option value="Invoice Number">Invoice Number</option>
                            <option value="Date">Date</option>
                            <option value="Status">Status</option>
                            <option value="Amount">Amount</option>
                        </select>
                </div>
            </div>


        </div>
    )
}

export default Queries