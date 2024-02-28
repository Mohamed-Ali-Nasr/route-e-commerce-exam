import Loader from "@/components/Loader";
import {
  useCashPaymentMutation,
  useGetUserCartQuery,
  useOnlinePaymentMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { CheckoutSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type CheckoutFormValues = {
  phone: string;
  city: string;
  address: string;
};

const Checkout = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const { cartId } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: CheckoutFormValues = {
    phone: "",
    city: "",
    address: "",
  };

  const [cashPayment, { isLoading: cashLoading }] = useCashPaymentMutation();
  const [onlinePayment, { isLoading: onlineLoading }] =
    useOnlinePaymentMutation();

  const cashPaymentHandler = async (values: CheckoutFormValues) => {
    try {
      await cashPayment({ cartId: cartId!, values }).unwrap();
      toast.success("Your Order Is Placed Successfully");
      dispatch(setNumOfItems(0));
      navigate("/allorders");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Placed Your Order");
    }
  };

  const onlinePaymentHandler = async (values: CheckoutFormValues) => {
    try {
      const data = await onlinePayment({
        cartId: cartId!,
        values,
      }).unwrap();
      toast.success("Your Order Is Placed Successfully");
      dispatch(setNumOfItems(0));
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.location.href = (data as any).session.url;
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Placed Your Order");
    }
  };

  const submitForm = async (values: CheckoutFormValues) => {
    if (selectedValue === "online") {
      await onlinePaymentHandler(values);
    }
    if (selectedValue === "cash") {
      await cashPaymentHandler(values);
    }
  };

  const { isLoading: getCartLoading } = useGetUserCartQuery();

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
    validationSchema: CheckoutSchema,
    onSubmit: submitForm,
  });

  if (cashLoading || onlineLoading || getCartLoading) {
    return <Loader />;
  }
  return (
    <section className="lg:mx-24 lg:px-8 px-2 py-12">
      <h2 className="mb-8 text-3xl font-semibold text-gray-500">Checkout</h2>

      <form className="select-none" onSubmit={handleSubmit}>
        <div className="mb-6">
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
            placeholder="Phone Number..."
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium" htmlFor="city">
              City
            </label>
            {errors.city && touched.city && (
              <p className="text-sm text-red-600">
                {errors.city || touched.city}
              </p>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              id="city"
              placeholder="Write Your City..."
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium" htmlFor="address">
              Details
            </label>
            {errors.address && touched.address && (
              <p className="text-sm text-red-600">
                {errors.address || touched.address}
              </p>
            )}
          </div>
          <div className="flex">
            <textarea
              id="address"
              placeholder="Write Your Address Here..."
              cols={30}
              rows={3}
              maxLength={200}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="focus:shadow-input-focus focus:outline-none w-full px-4 py-2 font-medium border border-gray-300 border-solid rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center mb-4">
            <input
              id="cash"
              type="radio"
              value="cash"
              className="w-5 h-5"
              onChange={() => {
                setSelectedValue("cash");
              }}
              checked={selectedValue === "cash"}
            />
            <label
              htmlFor="cash"
              className="ms-2 text-lg font-bold text-teal-600"
            >
              Cash Payment
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="online"
              type="radio"
              className="w-5 h-5"
              onChange={() => {
                setSelectedValue("online");
              }}
              checked={selectedValue === "online"}
            />
            <label
              htmlFor="online"
              className="ms-2 text-lg font-bold text-teal-600"
            >
              Online Payment
            </label>
          </div>
          {/* <div className="flex items-center px-3 py-1.5 rounded-lg mt-5 bg-gray-200">
            <label
              className="whitespace-nowrap text-xl font-medium cursor-pointer"
              htmlFor="isCash"
            >
              Is Online
            </label>
            <input
              className=" w-5 h-5 ml-2 rounded-md cursor-pointer"
              type="checkbox"
              id="isCash"
              onChange={() => {
                setIsOnlinePayment((prev) => !prev);
              }}
            />
          </div> */}
          <button
            disabled={!(dirty && isValid) || !selectedValue}
            type="submit"
            className="hover:bg-teal-700 focus:ring-teal-300 disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
          >
            Continue with {selectedValue === "online" ? "Online Payment" : ""}{" "}
            {selectedValue === "cash" ? "Cash Payment" : ""}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
