"use client"
import { useState,useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { VscOrganization } from "react-icons/vsc";

const Sidebar = () => {
    const router = useRouter();
    const [isDashboardActive, setIsDashboardActive] = useState(false);
    const [isInvoicesActive, setIsInvoicesActive] = useState(true);
    const [isVendorActive, setIsVendorActive] = useState(false);
    const [isSettingsActive, setIsSettingsActive] = useState(false);

    function toggleActive(active : string) {
        setIsDashboardActive(active === 'dashboard');
        setIsInvoicesActive(active === 'invoices');
        setIsVendorActive(active === 'vendor');
        setIsSettingsActive(active === 'settings');
    }

    return (
        <div className=" h-screen overflow-hidden">
            <p className="p-4 mx-auto text-4xl text-[#212f3d] w-full ml-4 cursor-pointer" onClick={() => {
                toggleActive('invoices')
                router.push('/')
            }}>finifi</p>
            <div className="ml-4 mt-10">                
                
                <div className={`mt-1 cursor-pointer p-2 ${isDashboardActive ? 'bg-[#273746] rounded-full rounded-r-none' : ''} `} onClick={() => {
                    toggleActive('dashboard')
                    router.push('/dashboard')
                }}>
                    <button className="flex justify-center items-center gap-2">
                        <MdDashboard className="" size={22} color={`${isDashboardActive ? '#ddd' : '#2c3e50'}`} />
                        <p className={`text-lg  ${isDashboardActive ? 'text-[#ddd]' : 'text-[#2c3e50]'}`}>Dashboard</p>
                    </button>
                </div>

                <div className={`mt-1 cursor-pointer p-2 ${isInvoicesActive ? 'bg-[#273746] rounded-full rounded-r-none' : ''} `} onClick={() => {
                    toggleActive('invoices')
                    router.push('/')
                }}>
                    <button className="flex justify-center items-center gap-2">
                        <TbInvoice className="" size={22} color={`${isInvoicesActive ? '#ddd' : '#2c3e50'}`} />
                        <p className={`text-lg  ${isInvoicesActive ? 'text-[#ddd]' : 'text-[#2c3e50]'}`}>Invoices</p>
                    </button>
                </div>

                <div className={`mt-1 cursor-pointer p-2 ${isVendorActive ? 'bg-[#273746] rounded-full rounded-r-none' : ''} `} onClick={() => {
                    toggleActive('vendor')
                    router.push('/vendors')
                    }}>
                    <button className="flex justify-center items-center gap-2">
                        <VscOrganization className="" size={22} color={`${isVendorActive ? '#ddd' : '#2c3e50'}`} />
                        <p className={`text-lg  ${isVendorActive ? 'text-[#ddd]' : 'text-[#2c3e50]'}`}>Vendors</p>
                    </button>
                </div>

                <div className={`mt-1 cursor-pointer p-2 ${isSettingsActive ? 'bg-[#273746] rounded-full rounded-r-none' : ''} `} onClick={() => {
                    toggleActive('settings')
                    router.push('/settings')
                }}>
                    <button className="flex justify-center items-center gap-2">
                        <IoSettingsOutline className="" size={22} color={`${isSettingsActive ? '#ddd' : '#2c3e50'}`} />
                        <p className={`text-lg  ${isSettingsActive ? 'text-[#ddd]' : 'text-[#2c3e50]'}`}>Settings</p>
                    </button>
                </div>


            </div>
        </div>
    );
  };
  
  export default Sidebar;
  