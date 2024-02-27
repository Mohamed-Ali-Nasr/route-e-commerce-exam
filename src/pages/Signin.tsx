import signin from "@/assets/signin.png";
import Loader from "@/components/Loader";
import { useSigninMutation } from "@/store/auth/authApi";
import { setCredentials, setToken } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/redux-hooks";
import { SignInSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type SigninFormValues = {
  email: string;
  password: string;
};

const Signin = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const dispatch = useAppDispatch();

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

  const initialValues: SigninFormValues = {
    email: "",
    password: "",
  };

  const [signinHandler, { isLoading }] = useSigninMutation();

  const submitForm = async (values: SigninFormValues) => {
    try {
      const res = await signinHandler(values).unwrap();

      dispatch(setCredentials({ email: res.user.email, name: res.user.name }));
      dispatch(setToken(res.token));

      toast.success(`welcome to Fresh Cart`);
      navigate("/");
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
    validationSchema: SignInSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="md:my-20 my-8">
      <div className="container px-4 mx-auto">
        <div className="justify-evenly md:flex-row flex flex-col items-center">
          <div className="lg:order-1 order-2 px-4">
            <img src={signin} alt={"signin-img"} />
          </div>

          <div className="lg:order-2 md:mb-0 order-1 px-4 mb-10">
            <div className="lg:mb-10 mb-6">
              <h1 className="mb-1 text-3xl font-bold text-gray-700">
                Sign in to FreshCart
              </h1>
              <p className="mt-0 mb-4">
                Welcome back to FreshCart! Enter your email to get started.
              </p>
            </div>

            <form className="select-none" onSubmit={handleSubmit}>
              <div className="mb-6">
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

              <div className="mb-6">
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

              <button
                disabled={!(dirty && isValid) || isLoading}
                type="submit"
                className="hover:bg-teal-700 focus:ring-teal-300 disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
              >
                Sign In
              </button>

              <p className="mt-5 text-base font-medium">
                You don’t have an account?{" "}
                <Link to="/signup" className="text-teal-500">
                  Sign Up
                </Link>
              </p>

              <Link
                to="/forget-password"
                className="block mt-2 text-base font-medium text-teal-500"
              >
                Forget Your Password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
