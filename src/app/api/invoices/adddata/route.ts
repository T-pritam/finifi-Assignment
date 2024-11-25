import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Invoice from '@/model/invoice';
import vendorModel from '@/model/vendor';

// Helper functions for random data generation
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Vendor names and statuses
const statuses = ['Open', 'Awaiting Approval', 'Approved', 'Processing', 'Paid', 'Rejected'];

// Populate 150-200 invoices
export async function POST() {
  await dbConnect()
  try {
    const vendors = await vendorModel.find({},'_id');    
    const vendorNames = vendors.map((vendor) => vendor._id);
    console.log(vendorNames)
    const rowCount = 199 
    const invoices = [];

    for (let i = 0; i < rowCount; i++) {
      const isDuplicate = i >= rowCount - 20 && i < rowCount; // Last 10-20 rows as duplicates
      const isVendorNotFound = i >= rowCount - 40 && i < rowCount - 20; // Previous 10-20 rows as vendor not found

      const vendor = isVendorNotFound ? null : getRandomElement(vendorNames);
      const status = isDuplicate
        ? 'Duplicate'
        : isVendorNotFound
        ? 'Vendor Not Found'
        : getRandomElement(statuses);

      const invoiceNumber = isDuplicate ? `DUP000${"010" + i}` : `INV000${"010" + i}`;
      const netAmount = getRandomNumber(50000, 100000); // Greater than 50,000
      const roundedAmount = Math.ceil(netAmount / 250) * 250; // Round to nearest 250

      const invoiceDate = new Date();
      invoiceDate.setDate(invoiceDate.getDate() - getRandomNumber(1, 60)); // Last 60 days

      const dueDate = new Date(invoiceDate);
      dueDate.setDate(dueDate.getDate() + getRandomNumber(1, 30)); // After invoice date

      const createdTime = new Date(invoiceDate);
      const createdDate = new Date(createdTime);
      createdDate.setHours(0, 0, 0, 0); // Reset time for consistency

      invoices.push({
        vendor,
        invoiceNumber,
        status,
        netAmount: roundedAmount,
        invoiceDate,
        dueDate,
        department: getRandomElement(['Finance', 'Sales', 'HR', 'IT']),
        poNumber: `PO${getRandomNumber(1000, 9999)}`,
        costCenter: getRandomElement(['Mumbai', 'Delhi', 'Chennai',"Bengaluru", "" , "Hyderabad"]),
        createdTime,
        createdDate,
      });
    }
    console.log(invoices.length)
    // Bulk insert invoices
    const insertedInvoices = await Invoice.insertMany(invoices);

    return NextResponse.json({ message: 'Invoices populated successfully!', count: insertedInvoices.length });
  } catch (error) {
    console.error('Error populating invoices:', error);
    return NextResponse.json({ error: 'Failed to populate invoices.' }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}
