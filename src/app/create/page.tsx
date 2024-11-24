"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Invoice from '@/model/invoice';

interface Invoice {
  vendor: string; // Vendor ID
  invoiceNumber: string;
  status: string;
  netAmount: number;
  invoiceDate: string;
  dueDate: string;
  department: string;
  costCenter: string;
  poNumber: string;
}

interface Vendor {
  _id: string; // ObjectId from MongoDB
  name: string;
  id: string;
}

const CreateInvoiceForm: React.FC = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [formData, setFormData] = useState<Invoice>({
    vendor: '',
    invoiceNumber: '',
    status: 'Open',
    netAmount: 0,
    invoiceDate: '',
    dueDate: '',
    department: '',
    costCenter: '',
    poNumber: '',
  });
  const [isNewVendor, setIsNewVendor] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', id: '' });

  useEffect(() => {
    async function fetchVendors() {
      const res = await axios.get('/api/vendor');
      const data = res.data.data;
      setVendors(data);
    }
    fetchVendors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'netAmount' ? parseFloat(value) : value,
    });
  };

  const handleNewVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let vendorId = formData.vendor;

    if (isNewVendor) {
      const vendorResponse = await axios.post('/api/vendor', {
        name: newVendor.name,
        id: newVendor.id
      });
      const createdVendor = vendorResponse.data.data;
      vendorId = createdVendor._id; 
    }
    console.log({ ...formData, vendor: vendorId });
    const invoiceResponse = await fetch('/api/invoices/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, vendor: vendorId }),
      });

    if (invoiceResponse.status) {
      setFormData({
        vendor: '',
        invoiceNumber: '',
        status: 'Open',
        netAmount: 0,
        invoiceDate: '',
        dueDate: '',
        department: '',
        costCenter: '',
        poNumber: '',
      });
      setIsNewVendor(false);
      setNewVendor({ name: '', id: '' });
      router.push('/');
    } else {
      alert('Failed to create invoice.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vendor</label>
          <select
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled={isNewVendor}
            required={!isNewVendor}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle New Vendor */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isNewVendor}
            onChange={() => setIsNewVendor(!isNewVendor)}
          />
          <label className="text-sm">Create New Vendor</label>
        </div>

        {/* New Vendor Fields */}
        {isNewVendor && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vendor Name</label>
              <input
                type="text"
                name="name"
                value={newVendor.name}
                onChange={handleNewVendorChange}
                className="w-full border border-gray-300 p-2 rounded"
                required={isNewVendor}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vendor ID</label>
              <input
                type="text"
                name="id"
                value={newVendor.id}
                onChange={handleNewVendorChange}
                className="w-full border border-gray-300 p-2 rounded"
                required={isNewVendor}
              />
            </div>
          </div>
        )}

        {/* Remaining Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Invoice Number</label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Net Amount</label>
            <input
              type="number"
              name="netAmount"
              value={formData.netAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cost Center</label>
            <input
              type="text"
              name="costCenter"
              value={formData.costCenter}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoiceForm;
