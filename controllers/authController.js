import AppError from "../utils/appError.js";
import * as argon2 from "argon2";
import { createUserM, getUserByEmailM } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}

const sendTokenCookie = (token, res) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie("jsw", token, cookieOptions)
}
export const signup = async (req, res, next) => {
    try {
        const newUser = req.body;
        const hash = await argon2.hash(newUser.password);
        newUser.password = hash;
        const createUser = await createUserM(newUser);
        if (!createUser) {
            throw new AppError("User not created", 400);
        }
        createUser.password = undefined;
        res.status(201).json({
            status: "succes",
            data: createUser,
        });

        // console.log(newUser);
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const logUser = await getUserByEmailM(email);
        if (!logUser) {
            throw new AppError("Wrong password or username", 400);
        }
        const isPasswordCorrect = await argon2.verify(logUser.password, password);
        if (!isPasswordCorrect) {
            throw new AppError("Wrong password or username", 400);
        }
        const token = signToken(logUser.id);
        sendTokenCookie(token, res);

        logUser.password = undefined;

        res.status(201).json({
            status: "succes",
            data: logUser,
        });
    } catch (error) {
        next(error);
    }
}

