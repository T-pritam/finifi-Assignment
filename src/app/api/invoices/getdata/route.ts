import dbConnect from "@/lib/db";
import Invoice from "@/model/invoice";

export async function GET() {
    await dbConnect();
    try {
        const invoices = await Invoice.find({}).populate('vendor').sort({ dueDate: -1 });
        return Response.json({
            status: true,
            data: invoices
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            status: false,
            message: "Something went wrong" + error
        });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { searchType, searchText } = await req.json();
        let invoices;

        if (searchType !== "netAmount" && searchType !== "dueDate" && searchType !== "invoiceDate" && searchType !== "vendorName") {
            invoices = await Invoice.find({
                [searchType]: { $regex: searchText, $options: 'i' }
            }).populate('vendor'); // Populate vendor here as well
        } else if (searchType === "netAmount") {
            invoices = await Invoice.find({
                netAmount: searchText
            }).populate('vendor'); // Populate vendor here as well
        } else if (searchType === "vendorName") {
            // Perform aggregation to search by vendor name
            invoices = await Invoice.aggregate([
                {
                    $lookup: {
                        from: 'vendors', // The collection name for Vendor
                        localField: 'vendor',
                        foreignField: '_id',
                        as: 'vendorDetails'
                    }
                },
                {
                    $unwind: '$vendorDetails' // Unwind to get the vendor data
                },
                {
                    $match: {
                        'vendorDetails.name': { $regex: searchText, $options: 'i' } // Case-insensitive search for vendor name
                    }
                },
                {
                    $lookup: {
                        from: 'vendors',
                        localField: 'vendor',
                        foreignField: '_id',
                        as: 'vendor'
                    }
                },
                {
                    $project: {
                        vendorName: '$vendorDetails.name',
                        invoiceNumber: 1,
                        status: 1,
                        netAmount: 1,
                        invoiceDate: 1,
                        dueDate: 1,
                        department: 1,
                        costCenter: 1,
                        poNumber: 1,
                        vendor: 1 // Ensure the vendor field is populated
                    }
                }
            ]);
        } else {
            // Handle date-based search
            const date = new Date(searchText);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));
            invoices = await Invoice.find({
                [searchType]: { $gte: startOfDay, $lte: endOfDay }
            }).populate('vendor'); // Populate vendor here as well
        }

        console.log(searchText, searchType);
        return Response.json({
            status: true,
            message: "Success",
            count: invoices.length,
            data: invoices
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
