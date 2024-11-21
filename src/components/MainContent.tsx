const MainContent = () => {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by vendor name or invoice number"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Invoice #</th>
              <th className="border border-gray-300 px-4 py-2">Vendor</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">INV12345</td>
              <td className="border border-gray-300 px-4 py-2">Vendor A</td>
              <td className="border border-gray-300 px-4 py-2">Open</td>
              <td className="border border-gray-300 px-4 py-2">$10,000</td>
              <td className="border border-gray-300 px-4 py-2">2024-12-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MainContent;
  