import { Request, Response } from "express";
import { userModal } from "../models/userschema";
const getUser = async (req: Request, res: Response) => {
  try {
    // const allUsers = await userModal.find();
    if (req.query.limit) {
      const pageLimit: any = req.query.limit;
      const page: any = req.query.page;
      const allUsers = await userModal
        .find()
        .limit(pageLimit)
        .skip((Number(page) - 1) * Number(pageLimit));
      const count = await userModal.find().countDocuments();
      res.status(200).json({
        success: true,
        allUsers,
        pageCount: Math.ceil(count / pageLimit),
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const User = await userModal.findById(req.params.id);
    res.status(200).json({
      success: true,
      User,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const createUser = async (req: Request, res: Response) => {
  const match = await userModal.findOne({ email: req.body.email });
  if (match) {
    return res.json({
      success: false,
      message: "email already exist use different email",
    });
  }
  try {
    const users = await userModal.create(req.body);
    users.address = "";
    res
      .status(200)
      .json({ success: true, users, message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await userModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ success: true, message: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await userModal.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "user Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    await userModal.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "All User Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export {
  createUser,
  getUser,
  deleteUser,
  deleteAllUsers,
  updateUser,
  getSingleUser,
};
