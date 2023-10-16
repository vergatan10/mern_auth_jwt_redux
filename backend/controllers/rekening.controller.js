import rekeningModel from "../models/rekening.model.js"
import responseHandler from "../handlers/response.handler.js";

const addRekening = async (req, res) => {
    try {
        const cekRekening = await rekeningModel.findOne(req.body.no_rek);

        if (cekRekening) return responseHandler.badrequest(req, 'nomor rekening sudah ada.');

        const rekening = rekeningModel({
            ...req.body
        });

        await rekening.save();

        return responseHandler.created(res, rekening)
    } catch {
        return responseHandler.error(res)
    }
}

const updateRekening = async (req, res) => {
    try {
        const { id } = req.params;
        const { no_rek, nominal } = req.body;

        const rekening = await rekeningModel.findById({ id });

        if (!rekening) return responseHandler.badrequest(res, 'Rekeninig tidak ada.');

        rekening.no_rek = no_rek;
        rekening.nominal = nominal;

        await rekening.save();

        return responseHandler.ok(res, rekening);
    } catch {
        return responseHandler.error(res)
    }
}

const deleteRekening = async (req, res) => {
    try {
        const id = req.params.id;

        const remove = await rekeningModel.findOne({ id });

        if (!remove) return responseHandler.badrequest(res, 'Rekeninig tidak ada, tidak ada yang dihapus.');

        await remove.remove();

        return responseHandler.ok(res);
    } catch {
        return responseHandler.error(res)
    }
}

const getRekeningByNasabah = async (req, res) => {
    try {
        const { id } = req.params;

        const rekening = await rekeningModel.find({ nasabah: id }).populate("Nasabah");

        if (!rekening) return responseHandler.badrequest(res, 'Rekening tidak ditemukan');

        return responseHandler.ok(res, rekening);
    } catch {
        return responseHandler.error(res)
    }
}

export default { addRekening, updateRekening, deleteRekening, getRekeningByNasabah }