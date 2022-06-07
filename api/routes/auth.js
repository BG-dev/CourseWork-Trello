const express = require("express");
const { addUser, loginUser } = require("../../service/userService");
const logger = require("../middlewares/logger");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = {
      username,
      email,
      password,
    };

    await addUser(user);
    const message = `User ${user.username} was created`;
    logger.info(message);
    res.status(201).send({ message });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = {
      username,
      password,
    };

    const loginData = await loginUser(user);
    const message = `User ${user.username} was logged in`;
    logger.info(message);
    res.status(201).send({
      ...loginData,
      message,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
