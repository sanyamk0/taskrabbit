const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//Function for registering user
const register = async (req, res) => {
  try {
    //get user data from req
    const { username, email, password } = req.body;

    //check if user exsits
    const existingUser = User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // hash password
    const hashPassword = bcrypt.hash(password, 10); //hash with 10 rounds

    //create user
    const user = await User.create({
      username,
      email,
      hashPassword,
    });
    await user.save();

    //generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //set cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //true for production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //24 hrs
    });

    //send res
    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      hash: hashPassword,
    });
  } catch (error) {
    console.log("Error in Register", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    //get data from req
    const { email, password, hashPassword } = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //verify password
    const passCheck = bcrypt.compare(password, hashPassword);
    if (!passCheck) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //token
    const token = jwt.sign({ if: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //return res
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error Login!!");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { register, login };
