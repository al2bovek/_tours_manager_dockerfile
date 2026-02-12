import express from "express";
import validateID from "../validators/id.js";
import validateNewTour from "../validators/newTour.js";
import validate from "../validators/validate.js";
import validateSort from "../validators/filterquery.js";
import { protect } from "../controllers/authController.js";
import { allowAccessTo } from "../controllers/authController.js";

import {
  getAlltours,
  getTourByID,
  getToursByDandD,
  postNewTour,
  updateTour,
  deleteTourByID,
  mForPostRoute,
} from "../controllers/toursController.js";

const toursRouter = express.Router();

//using tours Router
toursRouter
  .route("/:id")
  .get(validateID, validate, getTourByID)
  .patch(updateTour)
  .delete(deleteTourByID);;
toursRouter
  .route("/")
  .get(protect, allowAccessTo("admin"), validateSort, validate, getAlltours)
  .post(mForPostRoute, validateNewTour, validate, postNewTour);
toursRouter.route("/:duration/:difficulty").get(getToursByDandD);

export default toursRouter;
