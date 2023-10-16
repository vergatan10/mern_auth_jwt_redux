import express from 'express';
import nasabah from "./nasabah.route.js"
import rekening from "./rekening.route.js"
import user from "./user.route.js"

const router = express.Router();

router.use("/user", user)
router.use("/rekening", rekening)
router.use("/nasabah", nasabah)


export default router