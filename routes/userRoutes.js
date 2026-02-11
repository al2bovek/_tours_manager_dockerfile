import express from "express";
import {
  getAllUsers,
  postNewUser,
  // getUserByID,
  // updateUser,
} from "../controllers/usersController.js";
import { signup, login } from "../controllers/authController.js";

const usersRouter = express.Router();
usersRouter.route("/").get(getAllUsers).post(postNewUser);
// usersRouter.route("/:id").get(getUserByID).patch(updateUser);
usersRouter.route("/signup").post(signup);
usersRouter.route("/login").post(login);


export default usersRouter;
