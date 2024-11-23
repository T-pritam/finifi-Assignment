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