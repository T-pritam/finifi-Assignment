import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
    name: string;
    id : string
}

const VendorSchema = new Schema({
    name: { type: String, required: true },
    id : { type: String, required: true },
})

const vendorModel = (mongoose.models.Vendor as mongoose.Model<UserType>) ||
                mongoose.model<UserType>('Vendor', VendorSchema);

export default vendorModel