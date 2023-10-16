import mongoose from "mongoose";
import schemaOptions from "./schemaOptions.js";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
            select: false
        }
    },
    schemaOptions
)

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");

    return this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
}

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
    // console.log(this.password === hash);
    return this.password === hash;
}


const userModel = mongoose.model("User", UserSchema);

export default userModel;