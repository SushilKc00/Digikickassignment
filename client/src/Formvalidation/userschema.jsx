import * as yup from "yup";
export const userSchema = yup.object({
  name: yup.string().min(2).max(20).required("please enter your name"),
  email: yup.string().email().required("please enter your email"),
  address: yup.string().required("please enter your address"),
  mobile: yup.string().min(10).max(10).required("enter your mobile number"),
  address: yup.string().required("please enter your address"),
  gender: yup.string().required("please select a gender"),
});
