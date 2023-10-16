import express from 'express';
import { body } from "express-validator"
import nasabahController from "../controllers/nasabah.controller.js"
import requestHandler from "../handlers/request.handler.js"
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router();

router.post(
    "/add",
    body("nama")
        .exists().withMessage("nama is required"),
    body("telp")
        .exists().withMessage("telp is required")
        .isLength({ min: 10 }).withMessage("telp minimum is 10 characters"),
    body("email")
        .exists().withMessage("email is required")
        .isLength({ min: 8 }).withMessage("email minimum 8 characters"),
    requestHandler.validate,
    nasabahController.addNasabah
)

router.delete(
    "/delete/:id",
    requestHandler.validate,
    nasabahController.deleteNasabah
)

router.put(
    "/update/:id",
    tokenMiddleware.auth,
    body("nama")
        .exists().withMessage("nama is required"),
    body("telp")
        .exists().withMessage("telp is required")
        .isLength({ min: 10 }).withMessage("telp minimum is 10 characters"),
    body("email")
        .exists().withMessage("email is required")
        .isLength({ min: 8 }).withMessage("email minimum 8 characters"),
    requestHandler.validate,
    nasabahController.updateNasabah
)

router.get(
    "/",
    tokenMiddleware.auth,
    nasabahController.getAllNasabah
)

export default router