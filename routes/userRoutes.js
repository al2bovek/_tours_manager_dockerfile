import express from "express";
import {
  getAllUsers,
  // getUserByID,
  // updateUser,
} from "../controllers/usersController.js";
import { signup, login } from "../controllers/authController.js";

const usersRouter = express.Router();
usersRouter.route("/").get(getAllUsers);
// usersRouter.route("/:id").get(getUserByID).patch(updateUser);
usersRouter.route("/signup").post(signup);
usersRouter.route("/login/:email").post(login);


export default usersRouter;
