import * as yup from "yup";
export const registerSchema = yup.object({
  name: yup.string().min(2).max(20).required("please enter your name"),
  email: yup.string().email().required("please enter your email"),
  password: yup.string().min(6).required("please enter your password"),
  confirmpassword: yup
    .string()
    .required("please enter your confirm password")
    .oneOf([yup.ref("password"), null], "password must match"),
});
