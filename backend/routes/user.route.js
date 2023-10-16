import express from "express";
import { body } from "express-validator";
import userModel from "../models/user.model.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  async (req, res, next) => {
    console.log(req.body);
    next();
  },
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 6 })
    .withMessage("username minimum is 6 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already exists");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password minimum is 6 characters"),
  // body("confirmPassword")
  //   .exists()
  //   .withMessage("confirmPassword is required")
  //   .isLength({ min: 6 })
  //   .withMessage("confirmPassword minimum 8 characters")
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password)
  //       throw new Error("confirmPassword not match");
  //     return true;
  //   }),
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  async (req, res, next) => {
    console.log(req.body);
    next();
  },
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 6 })
    .withMessage("username minimum is 6 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password minimum 6 characters"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password minimum is 6 characters"),
  body("newPassword")
    .exists()
    .withMessage("new password is required")
    .isLength({ min: 6 })
    .withMessage("new password minimum is 6 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 6 })
    .withMessage("confirmNewPassword minimum 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("confirmNewPassword not match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.post("/check-token", tokenMiddleware.auth, (req, res) => {
  res.status(200).json("Authorized");
});

export default router;
