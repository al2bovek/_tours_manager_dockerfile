import { getAllUsersM } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const userList = await getAllUsersM();
  res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: userList,
    });
};

export const postNewUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "New User added",
  });
};

export const getUserByID = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "User with specified ID",
  });
};

export const updateUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "User updated",
  });
};
