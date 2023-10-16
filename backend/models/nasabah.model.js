import mongoose from "mongoose";
import schemaOptions from "./schemaOptions.js";

const Nasabah = new mongoose.Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        alamat: {
            type: String,
        },
        telp: {
            type: String,
        }
    },
    schemaOptions
)

export default mongoose.model("Nasabah", Nasabah)