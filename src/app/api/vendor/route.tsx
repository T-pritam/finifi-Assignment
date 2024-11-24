import dbConnect from "@/lib/db";
import vendorModel from "@/model/vendor";

export async function GET() {
    await dbConnect();
    try {
        const vendors = await vendorModel.find({});
        return Response.json({ status: true, message: "Success", data: vendors })

    } catch (error) {
        console.log(error)
        return Response.json({ status: false, message: "Something went wrong" + error })
    }    
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { name, id } = await req.json();
        const vendor = await vendorModel.create({ name, id });
        return Response.json({ status: true, message: "Success", data: vendor })
    } catch (error) {
        console.log(error)
        return Response.json({ status: false, message: "Something went wrong" + error })
    }
}