import Loader from "@/components/Loader";
import { useForgetPassMutation } from "@/store/auth/authApi";
import { forgetPassSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type ForgetPassFormValues = {
  email: string;
};

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues: ForgetPassFormValues = {
    email: "",
  };

  const [ForgetPass, { isLoading }] = useForgetPassMutation();

  const submitForm = async (values: ForgetPassFormValues) => {
    try {
      await ForgetPass(values).unwrap();
      toast.success("Reset code was sent to your email Successfully");
      navigate("/verify-code");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send code to your email");
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
    validationSchema: forgetPassSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">
        please enter your Email
      </h2>

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
            placeholder="your Email..."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
          />

          <button
            disabled={!(dirty && isValid)}
            type="submit"
            className="hover:bg-teal-700 focus:ring-teal-300 disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto md:w-[75%] block mt-12 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
          >
            Verify
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgetPassword;
