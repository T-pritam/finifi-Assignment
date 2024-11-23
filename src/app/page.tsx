"use client";
import Navbar from "@/components/Navbar";
import Queries from "@/components/Queries";
import { useEffect,useState } from "react";
import { Invoice} from "@/model/invoice";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useDebounce } from 'use-debounce';
import '@/components/css/scrollbar.css'

export default function Page() {

  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [sortedInvoices, setSortedInvoices] = useState<Invoice[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [activeState, setActiveState] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("Vendor Name");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  useEffect(() => {

    const fetchInvoices = async () => {
      try {
        const response = await axios.get('api/invoices');
        setAllInvoices(response.data.data);
        setInvoices(response.data.data.slice(0, pageSize));
        setTotalPage(Math.ceil(response.data.data.length / pageSize));
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  },[]);

  useEffect(() => {
    const sortedInvoices = allInvoices.filter((invoice) => {
      if (invoice.status === activeState) {
        return invoice;
      }
    });
    setSortedInvoices(sortedInvoices);
    setInvoices(sortedInvoices.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
    setTotalPage(Math.ceil(sortedInvoices.length / pageSize));
    if (activeState === "All") {
      setInvoices(allInvoices)
      setTotalPage(Math.ceil(allInvoices.length / pageSize));
    }
    setPageNumber(1);
  },[activeState]);

  useEffect(() => {
    if (activeState === "All") {
      setInvoices(allInvoices.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
      setTotalPage(Math.ceil(allInvoices.length / pageSize));
    } else {
      setInvoices(sortedInvoices.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
      setTotalPage(Math.ceil(sortedInvoices.length / pageSize));
    }
  },[pageSize,pageNumber]);

  const getDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="">
      <Navbar header="Manage Invoices" />
      <Queries activeState={activeState} setActiveState={setActiveState} setSearchText={setSearchText} setSearchType={setSearchType} searchText={searchText} searchType={searchType} />
      <div className="flex flex-col h-full bg-gray-100 p-2">
        <div className="bg-white shadow rounded-lg flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-200 sticky top-0 z-10 overflow-x-auto">
              <table className="table-fixed w-full  overflow-auto border-collapse">
                <thead className="text-center">
                  <tr>
                    <th className="pl-4 py-2 border-b border-gray-300 w-[150px]">
                      Vendor Name
                    </th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[100px]" >Invoice</th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[200px]">Status</th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[100px]">Net Amount</th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[100px]">Invoice Date</th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[100px]">Due Date</th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[100px]">Department</th>
                    <th className="px-4 py-2 border-b border-gray-300 w-[100px]">Cost Center</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Table Body */}
            <div className="overflow-y-auto text-sm max-h-80 flex-1 scrollbar-thin-y">
              <table className="table-auto w-full border-collapse">
                <tbody>

                  {
                    invoices.map((invoice, index) => (
                      <tr key={index} className="border-b border-gray-300 text-center">
                        <td className="px-4  py-2 border-r border-gray-300 sticky left-0 bg-white z-10 w-[150px]">
                          {invoice.vendorName}
                        </td>
                        <td className="px-4 py-2 w-[100px]">{invoice.invoiceNumber}</td>
                        <td className="px-4 py-2 w-[200px]">{invoice.status}</td>
                        <td className="px-4 py-2 w-[100px]">{invoice.netAmount.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 w-[100px]">{getDate(invoice.invoiceDate)}</td>
                        <td className="px-4 py-2 w-[100px]">{getDate(invoice.dueDate)}</td>
                        <td className="px-4 py-2 w-[100px]">{invoice.department}</td>
                        <td className="px-4 py-2 w-[100px]">{invoice.costCenter}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-100 p-2 border-t border-gray-300 sticky bottom-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="pageSize" className="text-sm text-gray-600">
                  Page Size:
                </label>
                <select
                  id="pageSize"
                  className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm" onChange={(e) =>{
                    setPageSize(parseInt(e.target.value))
                    setPageNumber(1)
                  }} >

                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>

                </select>
              </div>
              <div className="flex items-center gap-2">
                <IoIosArrowBack  className={`cursor-pointer ${pageNumber == 1 ? 'opacity-50 cursor-auto' : ''}`} onClick={() => setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 1)}/>
                  <p className="text-[#2c3e50] cursor-auto select-none">{pageNumber} of {totalPage}</p>
                <IoIosArrowForward className={`cursor-pointer ${pageNumber == totalPage ? 'opacity-50 cursor-auto' : ''}`} onClick={() => setPageNumber(pageNumber === totalPage ? pageNumber : pageNumber + 1)} />
              </div>
            </div>
          </div>
          
        </div>          
      </div>
    </div>
  );
}
