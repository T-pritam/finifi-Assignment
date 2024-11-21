import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
    email: string;
    username: string;
    password: string;
    profileImage: string;
}

const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
});

const UserModel = (mongoose.models.User as mongoose.Model<UserType>) ||
                mongoose.model<UserType>('User', UserSchema);

export default UserModel;