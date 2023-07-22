import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const Process: any = process.env.JWT_SECRT;

export const jsonToken = async (id: Object) => {
  const token = await jwt.sign({ userId: id }, Process);
  return token;
};
