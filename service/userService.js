const { validateUser, validateNewUser } = require("./validators/userValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../integration/models/User");

async function addUser(newUserData) {
  const { error } = validateNewUser(newUserData);
  if (error) throw new Error(error.details[0].message);

  const candidate = await findUser(newUserData);
  console.log(candidate);
  if (candidate)
    throw new Error("User with this username or email already exists");

  const hashedPassword = await bcrypt.hash(newUserData.password, 12);
  const newUser = {
    username: newUserData.username,
    email: newUserData.email,
    password: hashedPassword,
  };

  await User.create({ ...newUser });
}

async function loginUser(userData) {
  const { error } = validateUser(userData);
  if (error) throw new Error(error.details[0].message);

  const user = await findUserByUsername(userData.username);

  if (!user) throw new Error("This user no exists");

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) throw new Error("Password is incorrect");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, username: userData.username, userId: user.id };
}

const findUser = async (user) =>
  await User.findOne({
    $or: [
      {
        username: user.username,
      },
      {
        email: user.email,
      },
    ],
  });

const findUserByUsername = async (username) =>
  await User.findOne({
    username,
  });

const findUserById = async (userId) => await User.findById(userId);

module.exports = {
  addUser,
  loginUser,
  findUserById,
};
