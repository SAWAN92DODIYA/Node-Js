const express = require("express");

const router = express.Router();

const User = require("../models/user");
const {
  handleGetAllUser,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
  handleUpdateUserById} = require("../controllers/user");

router
  .route("/")
  .get(handleGetAllUser)
  .post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById)

module.exports = router; 