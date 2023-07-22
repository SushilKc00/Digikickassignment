import { Request, Response } from "express";
import { authSchema } from "../models/authschema";
import { jsonToken } from "../helpers/jwtToken";

//registercontroller
const authRegister = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExist = await authSchema.findOne({ email });
    if (userExist) {
      return res.json({
        success: false,
        message: "user already exist please use unique email",
      });
    } else {
      await authSchema.create(req.body);
      res.json({ success: true, message: "register successfull" });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "server errror",
    });
  }
};

//logincontroller
const authLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExist = await authSchema.findOne({ email });
  if (userExist) {
    if (userExist.password === password) {
      const token = jsonToken(userExist._id);
      res.json({
        success: true,
        message: "login successfull",
        userid: userExist._id,
        token,
      });
    } else {
      res.json({ success: false, message: "wrong credentials" });
    }
  } else {
    res.json({ success: false, message: "user not found" });
  }
};

export { authLogin, authRegister };
