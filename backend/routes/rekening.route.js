import express from "express";
import { body } from "express-validator"
import requestHandler from "../handlers/request.handler.js"
import rekeningController from "../controllers/rekening.controller.js"
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.get(
    "/get/:id",
    tokenMiddleware.auth,
    rekeningController.getRekeningByNasabah
)

router.post(
    "/add",
    tokenMiddleware.auth,
    body("no_rek")
        .exists().withMessage("no.Rek is required"),
    body("nominal")
        .exists().withMessage("nominal is required"),
    body("nasabah")
        .exists().withMessage("nasabah is required"),
    requestHandler.validate,
    rekeningController.addRekening
)

router.delete(
    "/delete/:id",
    tokenMiddleware.auth,
    rekeningController.deleteRekening
)

router.put(
    "/update/:id",
    tokenMiddleware.auth,
    body("no_rek")
        .exists().withMessage("no.Rek is required"),
    body("nominal")
        .exists().withMessage("nominal is required"),
    requestHandler.validate,
    rekeningController.updateRekening
)

export default router