import { Router } from "express";
import {
  createUser,
  deleteAllUsers,
  deleteUser,
  getSingleUser,
  getUser,
  updateUser,
} from "../controllers/user";
const userRouter = Router();

userRouter.route("/").post(createUser).get(getUser);
userRouter.route("/:id").get(getSingleUser);
userRouter.route("/update/:id").put(updateUser);
userRouter.route("/delete").delete(deleteAllUsers);
userRouter.route("/delete/:id").delete(deleteUser);

export default userRouter;
