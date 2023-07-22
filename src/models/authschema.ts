import { Schema, model } from "mongoose";

const schemaAuth = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, min: 3 },
  confirmpassword: { type: String, required: true, trim: true, min: 3 },
});

export const authSchema = model("auth", schemaAuth);
