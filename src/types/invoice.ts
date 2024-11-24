export interface Invoice extends Document {
    vendor : {
        name: string;
        id : string;
    };
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