import dbConnect from "@/lib/db";
import Invoice from "@/model/invoice";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const invoice = await Invoice.create(await req.json());
        return Response.json({ status: true, message: "Success", data: invoice })
    } catch (error) {
        console.log(error)
        return Response.json({ status: false, message: "Something went wrong" + error })
    }
}