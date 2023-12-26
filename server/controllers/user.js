import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient Password Length" });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPass,
    });
    const { _id: id, photoURL } = user;
    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      success: true,
      result: { id, name, email: user.email, photoURL, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "User creation error" });
  }
};
