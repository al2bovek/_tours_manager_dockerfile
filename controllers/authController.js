import AppError from "../utils/appError.js";
import * as argon2 from "argon2";
import { createUserM, getUserByEmailM } from "../models/userModel.js";
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
        const { email, password } = res.body;
        if (!email || !password) {
            throw new AppError("User not created", 400);
        }

    } catch (error) {
        next(error);
    }
}