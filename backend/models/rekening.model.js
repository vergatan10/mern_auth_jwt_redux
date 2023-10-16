import mongoose from "mongoose";
import schemaOptions from "./schemaOptions.js";

const Rekening = new mongoose.Schema(
    {
        nasabah: {
            type: mongoose.Types.ObjectId,
            ref: "Nasabah",
            required: true
        },
        no_rek: {
            type: String,
            required: true,
            unique: true
        },
        nominal: {
            type: Number,
            required: true
        },
    },
    schemaOptions
)

export default mongoose.model("Rekening", Rekening)