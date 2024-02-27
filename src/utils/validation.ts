import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),

  email: Yup.string().email().required("Email is required"),

  phone: Yup.string()
    .matches(/^(002)?01[0125][0-9]{8}$/i, "Invalid Phone Number")
    .required("Phone is required"),

  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/i, "Invalid Password")
    .required("Password is required"),

  rePassword: Yup.string()
    .required("You should repeat the password")
    .oneOf([Yup.ref("password")], "Type the correct password"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),

  password: Yup.string().required("Password is required"),
});

export const CheckoutSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^(002)?01[0125][0-9]{8}$/i, "Invalid Phone Number")
    .required("Phone is required"),

  city: Yup.string().required("City is required"),

  address: Yup.string().min(10).max(200).required("Details is required"),
});

export const forgetPassSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

export const verifyCodeSchema = Yup.object().shape({
  resetCode: Yup.string().required("Code is required"),
});

export const ResetPassSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),

  newPassword: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/i, "Invalid Password")
    .required("Password is required"),
});
