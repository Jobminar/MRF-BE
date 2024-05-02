import Admin from "../model/adminModel.js";
import jwt from 'jsonwebtoken'
import argon2 from "argon2";
const adminController = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Required fields is missing !!" });
      }

      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Already existing admin" });
      }
      const hashedPassword = await argon2.hash(password, 10);
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();
      res.status(201).json({ message: "signup admin successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to admin signup" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Required fields is missing !! " });
      }

      const admin = await Admin.findOne({ email });
        if (!admin) {
           return res.status(404).json({ message: "Admin not found !!" });
        }

      const isValidPassword = await argon2.compare(password, admin.password);
      if (!isValidPassword) {
           return res.status(401).json({ message: "Invalid password " });
         }

    
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login admin successfully",adminId: admin._id, token });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to login" });
    }
  },
};
export default adminController;
