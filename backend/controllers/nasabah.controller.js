import nasabahModel from "../models/nasabah.model.js"
import rekeningModel from "../models/rekening.model.js"
import responseHandler from "../handlers/response.handler.js"

const addNasabah = async (req, res) => {
    try {
        const { nama, alamat, telp } = req.body;

        const nasabah = nasabahModel;

        nasabah.nama = nama;
        nasabah.alamat = alamat;
        nasabah.telp = telp;

        await nasabah.save();

        return responseHandler.created(res, nasabah)
    } catch {
        return responseHandler.error(res)
    }
}

const updateNasabah = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, alamat, telp } = req.body;

        const nasabah = nasabahModel.findOne({ id });

        if (!nasabah) return responseHandler.badrequest(res, 'Nasabah tidak ditemukan');

        nasabah.nama = nama;
        nasabah.alamat = alamat;
        nasabah.telp = telp;

        await nasabah.save();

        return responseHandler.created(res, nasabah)
    } catch {
        return responseHandler.error(res)
    }
}

const deleteNasabah = async (req, res) => {
    try {
        const { id } = req.params

        const nasabah = await nasabahModel.findByIdAndRemove({ id });

        if (!nasabah) return responseHandler.badrequest(res, 'Nasabah tidak ditemukan')

        const rekening = await rekeningModel.deleteMany({ id });

        return responseHandler.ok(res);
    } catch {
        return responseHandler.error(res)
    }
}

const getAllNasabah = async (req, res) => {
    try {
        const nasabah = await nasabahModel.find({})

        if (!nasabah) return responseHandler.badrequest(res, 'Nasabah kosong.');

        return responseHandler.ok(res, nasabah)
    } catch {
        return responseHandler.error(res)
    }
}

export default { addNasabah, updateNasabah, getAllNasabah, deleteNasabah }