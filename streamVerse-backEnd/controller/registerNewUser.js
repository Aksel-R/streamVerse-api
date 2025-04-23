const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();

const { addNewUser, loginUser } = require("../module/registerNewUser");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.uid, email: user.email }, process.env.JWT_SECRET);
};

const registerUser = async (email, password, displayName) => {
  try {
    const existingUser = await loginUser(email);
    if (existingUser !== null) {
      return { success: false, message: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uid = uuidv4();
    const newUser = {
      additionalUserInfo: {
        providerId: "streamverse.com",
      },
    
      user: {
        displayName:displayName,
        email: email.toLowerCase(),
        photoURL: "",
        uid:uid,
        password: hashedPassword,
       
      },
    };

    await addNewUser(uid, newUser);
    const token = generateToken(newUser.user);

    return {
      success: true,
      token,
      user: newUser.user,
      additionalUserInfo: {
        providerId: "streamverse.com",
      }
    };
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, message: "Internal server error" };
  }
};

const loginUserController = async (email, password) => {
  try {
    const existingUser = await loginUser(email);

    if (!existingUser) {
      return { success: false, message: "User doesn't exist" };
    }

    const isMatch = await bcrypt.compare(password, existingUser.user.password);
    if (!isMatch) {
      return { success: false, message: "Wrong password" };
    }

    const token = generateToken(existingUser.user);
    return {
      success: true,
      token,
      user: existingUser.user,
      additionalUserInfo: {
        providerId: "streamverse.com",
      }
    };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Internal server error" };
  }
};

module.exports = {
  registerUser,
  loginUserController,
};
