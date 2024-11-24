"use client"
import React from 'react'
import { IoSearch } from "react-icons/io5";
import { useRouter } from 'next/navigation';

function Queries(props: {
    activeState : string, 
    searchType : string,
    searchText : string,
    setActiveState: React.Dispatch<React.SetStateAction<string>>,
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    setSearchType: React.Dispatch<React.SetStateAction<string>>
}) {
    const router = useRouter();
    const handleButtonClick = (buttonName: string) => {
        props.setActiveState(buttonName);
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
                            className={`${baseClass} ${props.activeState === label ? "border-[#273746]" : "border-transparent"}`}>
                            <p className='text-sm'>{label}</p>
                        </button>
                    ))
                }

            </div>
            <hr className="h-px  border-0 bg-gray-500" />

            <div className="px-16 py-2 flex row w-full">

                <div className='bg-[#2c3e50] p-1 px-4 rounded w-40 cursor-pointer' onClick={() => router.push('/create')}>
                    <p className='text-center text-[#ddd]'>Create Invoice</p>
                </div>

                <div className='flex justify-around w-full'>
                <div className="flex justify-between items-center w-2/5 max-w-4xl bg-gray-100 rounded-xl border-2 border-gray-600">
                    <div className="flex items-center space-x-4 bg-[#d5d8dc] p-1 rounded-l-[12px]">
                        <IoSearch size={22} />
                        <select
                            value={props.searchType}
                            onChange={(e) => {
                                props.setSearchType(e.target.value)
                                props.setSearchText('')
                            }}
                            className="text-sm bg-transparent rounded-lg text-gray-700 focus:outline-none cursor-pointer">
                            <option value="vendorName">Vendor Name</option>
                            <option value="invoiceNumber">Invoice Number</option>
                            <option value="invoiceDate">Invoice Date</option>
                            <option value="dueDate">Due Date</option>
                            <option value="netAmount">Amount</option>
                        </select>
                    </div>

                    {/* Vertical Divider */}
                    <div className="border-l-2 border-gray-300 h-full"></div> {/* Vertical Divider */}

                    {/* Right Section: Input Field */}
                    {
                        props.searchType.includes('Date')
                        ? (
                            <input
                        type="date"
                        value={props.searchText}
                        className="outline-none text-sm bg-transparent flex-1 p-1 text-gray-700"
                        placeholder="Search..." onChange={(e) => props.setSearchText(e.target.value)}/>
                        ) : (
                            <input
                        type="text"
                        value={props.searchText}
                        className="outline-none text-sm bg-transparent flex-1 p-1 text-gray-700"
                        placeholder="Search..." onChange={(e) => props.setSearchText(e.target.value)}/>
                        )
                    }
                </div>
                <div className='bg-[#2c3e50] rounded p-1'>
                <select
                            onChange={(e) => props.setSearchType(e.target.value)}
                            className="bg-transparent text-sm rounded-lg text-[#eee] focus:outline-none cursor-pointer">
                            <option className='text-[#2c3e50]' value="Vendor Name">Action</option>
                            <option className='text-[#2c3e50]' value="Invoice Number">Delete Invoices</option>
                        </select>
                </div>
                </div>
                
            </div>


        </div>
    )
}

export default Queries