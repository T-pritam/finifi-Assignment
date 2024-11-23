import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Invoice document
export interface Invoice extends Document {
  vendorName: string;
  invoiceNumber: string;
  status: string;
  netAmount: number;
  invoiceDate: Date;
  dueDate: Date;
  department: string;
  costCenter: string;
  poNumber: string;
  createdTime: Date;
  createdDate: Date;
}

// Define the schema for the Invoice model
const InvoiceSchema: Schema = new Schema<Invoice>({
  vendorName: { type: String, required: false, trim: true },
  invoiceNumber: { type: String, required: false, unique: true },
  status: {
    type: String,
    enum: [
      'Open',
      'Awaiting Approval',
      'Approved',
      'Processing',
      'Paid',
      'Rejected',
      'Vendor Not Found',
      'Duplicate',
      'Void',
    ],
    required: false,
  },
  netAmount: { type: Number, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  department: { type: String, required: false, trim: true },
  costCenter: { type: String, required: false, trim: true },
  poNumber: { type: String, required: false, trim: true },
  createdTime: { type: Date, default: Date.now },
  createdDate: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
});

const Invoice = mongoose.models.Invoice || mongoose.model<Invoice>('Invoice', InvoiceSchema);
export default Invoice;
