import userModel from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import crypto from "crypto"

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const checkUser = await userModel.findOne({ username })

        if (checkUser) return responseHandler.badrequest(res, 'username sudah ada.')

        const user = userModel();

        user.username = username;
        user.setPassword(password);

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )

        return responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        })
    } catch {
        return responseHandler.error(res)
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select('username password salt id');

        if (!user) return responseHandler.badrequest(res, 'User tidak ditemukan');

        if (!user.validPassword(password)) return responseHandler.badrequest(res, 'Password salah');

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        user.password = undefined;
        user.salt = undefined;

        return responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        })
    } catch {
        return responseHandler.error(res)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await userModel.findById(req.user.id).select('password id salt');

        if (!user) return responseHandler.unauthorize(res);

        if (!user.validPassword(password)) return responseHandler.badrequest(res, 'Password salah');

        // console.log(user.validPassword(password));
        // console.log(newPassword);
        user.setPassword(newPassword)
        await user.save();

        return responseHandler.ok(res)
    } catch {
        return responseHandler.error(res)
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) return responseHandler.unauthorize(res);

        return responseHandler.ok(res, user)
    } catch {
        return responseHandler.error(res)
    }
}

export default { signup, signin, updatePassword, getInfo }