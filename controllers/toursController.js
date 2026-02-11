import {
  getAllToursM,
  getTourByIDM,
  postNewTourM,
  updateTourM,
} from "../models/toursModel.js";
import AppError from "../utils/appError.js";

//1.
export const getAlltours = async (req, res, next) => {
  try {
    const { sort } = req.query;
    const toursList = await getAllToursM(sort);

    if (toursList.length === 0) {
      throw new AppError("No tours found", 404);
    }

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: toursList,
    });
  } catch (error) {
    next(error);
  }
};

//2.
export const getTourByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);

    const tour = await getTourByIDM(id);

    if (!tour) {
      throw new AppError("Invalid tour ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
   next(error)
  }
};

//3. //užduotis jums
export const getToursByDandD = (req, res) => {
  // { duration: '5', difficulty: 'easy' }
  const { duration, difficulty } = req.params;

  if (!duration || !difficulty) {
    res.status(404).json({
      status: "fail",
      message: "Difficulty or duration not valid",
    });
    return;
  }

  const toursf = "neparašytas modelis";

  res.status(200).json({
    status: "success",
    data: toursf,
  });
};

//4.
export const postNewTour = async (req, res) => {
  try {
    const newTour = req.body;

    if (!newTour || !newTour.name || !newTour.duration) {
      res.status(400).json({
        status: "fail",
        message: "Missing tour information",
      });
      return;
    }

    const tour = await postNewTourM(newTour);

    res.status(201).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//5.
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const newTourData = req.body;

    const tourUpdated = await updateTourM(id, newTourData);

    if (!tourUpdated) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
      return;
    }

    res.status(201).json({
      status: "success",
      data: tourUpdated,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }

  res.status(200).json({
    status: "success",
    data: newTour,
  });
};

// 6
export const deleteTourByID = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await deleteTourByIDM(id);

    if (!tour) {
      res.status(404).json({
        status: "fail",
        message: "Invalid tour ID",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//middleware
export const mForPostRoute = (req, res, next) => {
  console.log("Hello from delete middleware");
  next();
};
