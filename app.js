// const express = require("express");
import express from "express";

import toursRouter from "./routes/tourRoutes.js";
import usersRouter from "./routes/userRoutes.js";

//create server
const app = express();

//parses (converts to js object) incoming json data to req.body
app.use(express.json());

//middleware, for all routes
app.use((req, res, next) => {
  // console.log("Hello from the middleware for any routes");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//mounting the routers
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

//centralizes error handling middleware, if first functions argument is error, express will know that this is error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errstatus = err.status || "error";
  const errMessage = err.message || "Internal server Error";

  res.status(statusCode).json({
    status: errstatus,
    message: errMessage,
  });
});

export default app;
