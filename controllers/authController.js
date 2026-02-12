import AppError from "../utils/appError.js";
import * as argon2 from "argon2";
import { createUserM, getUserByEmailM, getUserByIdM } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// make and return jwt token
const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}

// send cookie with jwt token to client
const sendTokenCookie = (token, res) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie("jwt", token, cookieOptions)
}

// new user write to db
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

//  user connect data check and write jwt token 
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const logUser = await getUserByEmailM(email);
        if (!logUser) {
            throw new AppError("Wrong password or username", 401);
        }
        const isPasswordCorrect = await argon2.verify(logUser.password, password);
        if (!isPasswordCorrect) {
            throw new AppError("Wrong password or username", 401);
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

//  authorisation from not registered users
export const protect = async (req, res, next) => {
    try {
        // console.log(req.cookies);
        // console.log(req);
        let token = req.cookies?.jwt;
        // console.log(token);
        if (!token) {
            throw new AppError("not logged");
        }
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedUser);
        const currentUser = await getUserByIdM(decodedUser.id);
        if (!currentUser) {
            throw new Error("user not exist", 401);
        }
        req.logUser = currentUser;
        next();
    } catch (error) {
        next(error);
    }
}

// check role 

export const allowAccessTo = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.logUser.role)) {
                throw new Error("no premission", 403);
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

// logout
export const logoutUser = (req, res) => {
    return res.clearCookie('jwt').status(200).json({
        status: "success",
        message: "logout",
    })
}