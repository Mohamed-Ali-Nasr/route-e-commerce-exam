import signup from "@/assets/signup-g.svg";
import Loader from "@/components/Loader";
import { useSignupMutation } from "@/store/auth/authApi";
import { SignUpSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type SignupFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
};

const Signup = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const [signupHandler, { isLoading }] = useSignupMutation();

  const submitForm = async (values: SignupFormValues) => {
    try {
      await signupHandler(values).unwrap();
      toast.success("Thanks for create account, please Login to your Account.");
      navigate("/signin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="md:my-16 my-8">
      <div className="container px-4 mx-auto">
        <div className="justify-evenly md:flex-row flex flex-col items-center">
          <div className="lg:order-1 order-2 px-4">
            <img src={signup} alt={"signup-img"} />
          </div>

          <div className="lg:order-2 md:mb-0 order-1 px-4 mb-10">
            <div className="mb-6">
              <h1 className="mb-1 text-3xl font-bold text-gray-700">
                Get Start Shopping
              </h1>
              <p className="mt-0 mb-2">
                Welcome to FreshCart! Enter your email to get started.
              </p>
            </div>

            <form className="select-none" onSubmit={handleSubmit}>
              <div className="mb-2">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  {errors.name && touched.name && (
                    <p className="text-sm text-red-600">
                      {errors.name || touched.name}
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                />
              </div>

              <div className="mb-2">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  {errors.email && touched.email && (
                    <p className="text-sm text-red-600">
                      {errors.email || touched.email}
                    </p>
                  )}
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                />
              </div>

              <div className="mb-2">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="phone">
                    Phone
                  </label>
                  {errors.phone && touched.phone && (
                    <p className="text-sm text-red-600">
                      {errors.phone || touched.phone}
                    </p>
                  )}
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                />
              </div>

              <div className="mb-2">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  {errors.password && touched.password && (
                    <p className="text-sm text-red-600">
                      {errors.password || touched.password}
                    </p>
                  )}
                </div>
                <div className="flex">
                  <input
                    type={type}
                    id="password"
                    placeholder="******"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                  />
                  <span
                    className="flex items-center justify-around cursor-pointer"
                    onClick={handleToggle}
                  >
                    {icon ? (
                      <HiOutlineEye className="absolute mr-12" size={25} />
                    ) : (
                      <HiOutlineEyeOff className="absolute mr-12" size={25} />
                    )}
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="rePassword">
                    rePassword
                  </label>
                  {errors.rePassword && touched.rePassword && (
                    <p className="text-sm text-red-600">
                      {errors.rePassword || touched.rePassword}
                    </p>
                  )}
                </div>

                <input
                  type="password"
                  id="rePassword"
                  placeholder="******"
                  value={values.rePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                />
              </div>

              <button
                type="submit"
                disabled={!(dirty && isValid) || isLoading}
                className="hover:bg-teal-700 focus:ring-teal-300 disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
              >
                Sign Up
              </button>

              <p className="mt-5 text-base font-medium">
                You have an account?{" "}
                <Link to="/signin" className="text-teal-500">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
