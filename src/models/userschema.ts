import { Schema, model } from "mongoose";

const schemaUser = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  mobile: { type: String, required: true, trim: true, min: 3 },
  address: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  profile: { type: String, default: "profile.png" },
});

export const userModal = model("user", schemaUser);
