import dbConnect from "@/lib/db";
import Invoice from "@/model/invoice";

export async function GET() {
    await dbConnect();
    try {
        const invoices = await Invoice.find({});
        return Response.json({
            status: true,
            data: invoices
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: false,
            message: "Something went wrong" + error
        })
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { searchType,searchText } = await req.json()
        let invoices;
        if (searchType !== "netAmount" && searchType !== "dueDate" && searchType !== "invoiceDate") {
            invoices = await Invoice.find({
                [searchType] : { $regex: searchText, $options: 'i' }
            });
        } else if(searchType === "netAmount") {
            invoices = await Invoice.find({
                netAmount: searchText
            })
        } else {
            const date = new Date(searchText);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0)); 
            const endOfDay = new Date(date.setHours(23, 59, 59, 999)); 
            invoices = await Invoice.find({
                [searchType]: { $gte: startOfDay, $lte: endOfDay }
            })

        }
        console.log(searchText,searchType)
        return Response.json({
            status: true,
            message: "Success",
            count: invoices.length,
            data: invoices
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: false,
            message: "Something went wrong : " + error
        })
    }
}