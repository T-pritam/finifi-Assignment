"use client";
import Navbar from "@/components/Navbar";
import Queries from "@/components/Queries";

export default function Page() {
  return (
    <div className="overflow-hidden">
      <Navbar header="Manage Invoices" />
      <Queries />
      <div className="flex flex-col h-full bg-gray-100 p-4 overflow-hidden ">
        <div className="bg-white shadow rounded-lg flex-1 flex flex-col">
          {/* Table Header */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-200 sticky top-0 z-10">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300">
                      Vendor Name
                    </th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Invoice</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Status</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Net Amount</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Invoice Date</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Due Date</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Department</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Cost Center</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Table Body */}
            <div className="overflow-y-auto text-sm max-h-80 flex-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <table className="table-auto w-full border-collapse">
                <tbody>
                  {Array.from({ length: 50 }, (_, i) => (
                    <tr key={i} className="border-b border-gray-300">
                      <td className="px-4 py-2 border-r border-gray-300 sticky left-0 bg-white z-10">
                        Vendor {i}
                      </td>
                      <td className="px-4 py-2">INV-{1000 + i}</td>
                      <td className="px-4 py-2">Open</td>
                      <td className="px-4 py-2">$5000</td>
                      <td className="px-4 py-2">2024-12-01</td>
                      <td className="px-4 py-2">2024-12-15</td>
                      <td className="px-4 py-2">Finance</td>
                      <td className="px-4 py-2">Finance</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fixed Pagination */}
          <div className="bg-gray-100 p-2 border-t border-gray-300 sticky bottom-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="pageSize" className="text-sm text-gray-600">
                  Page Size:
                </label>
                <select
                  id="pageSize"
                  className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
