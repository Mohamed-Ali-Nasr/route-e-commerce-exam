import Loader from "@/components/Loader";
import { useVerifyCodeMutation } from "@/store/auth/authApi";
import { verifyCodeSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type VerifyCodeFormValues = {
  resetCode: string;
};

const VerifyCode = () => {
  const navigate = useNavigate();

  const initialValues: VerifyCodeFormValues = {
    resetCode: "",
  };

  const [verifyResetCode, { isLoading }] = useVerifyCodeMutation();

  const submitForm = async (values: VerifyCodeFormValues) => {
    try {
      await verifyResetCode(values).unwrap();
      toast.success("Your Code is Verified Successfully");
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Verify your code, please resend it again");
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
    validationSchema: verifyCodeSchema,
    onSubmit: submitForm,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">
        Enter Your Reset Code
      </h2>

      <form className="select-none" onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium" htmlFor="resetCode">
              Reset Code
            </label>
            {errors.resetCode && touched.resetCode && (
              <p className="text-sm text-red-600">
                {errors.resetCode || touched.resetCode}
              </p>
            )}
          </div>
          <input
            type="text"
            id="resetCode"
            placeholder="your reset code..."
            value={values.resetCode}
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

export default VerifyCode;
