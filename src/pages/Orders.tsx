import Loader from "@/components/Loader";
import { selectAuth } from "@/store/auth/authSlice";
import {
  useGetUserCartQuery,
  useGetUserOrdersQuery,
} from "@/store/cart/cartApi";
import { selectCart } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/redux-hooks";
import { Link } from "react-router-dom";

const Orders = () => {
  const { userId } = useAppSelector(selectAuth);
  const { userOrders } = useAppSelector(selectCart);

  const { isLoading, isError } = useGetUserOrdersQuery(userId!);

  const { isLoading: getCartLoading } = useGetUserCartQuery();

  if (isLoading || getCartLoading) {
    return <Loader />;
  }

  return (
    <section className="xl:mx-24 px-2 py-12">
      <p className="mb-8 text-4xl font-medium text-gray-500">My Orders</p>

      {isError && (
        <p className="my-12 text-4xl font-semibold text-center text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {userOrders?.length > 0 ? (
        <>
          {userOrders?.map(
            ({
              id,
              cartItems,
              paymentMethodType,
              shippingAddress,
              totalOrderPrice,
            }) => (
              <div
                style={{
                  boxShadow:
                    "12px 12px 26px rgba(0, 0, 0, 0.2),-12px -12px 26px rgba(255, 255, 255, 0.6)",
                }}
                key={id}
                className="md:flex-row rounded-xl flex flex-col justify-between gap-8 p-4 my-4"
              >
                <div>
                  {cartItems.map(({ count, price, product, _id }) => (
                    <div key={_id} className="flex items-center mb-2">
                      <img
                        className="w-24 mr-3"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div>
                        <h3 className="mb-2 text-lg font-medium text-gray-500">
                          {product.title.split(" ").slice(0, 4).join(" ")}
                        </h3>
                        <h4 className="mb-2 font-bold text-teal-500">
                          {price} EGP
                        </h4>
                        <h4>
                          Qty:{" "}
                          <span className="font-medium text-teal-500">
                            {count}
                          </span>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="whitespace-nowrap">
                  <h3 className="border-b-teal-400 w-fit mb-2 text-3xl font-semibold text-gray-900 border-b">
                    order details
                  </h3>
                  <div className="flex gap-6 mb-2">
                    <h4 className="text-lg font-medium text-gray-700">
                      Order ID:
                    </h4>
                    <p className="text-lg font-medium text-teal-500">{id}</p>
                  </div>

                  <div className="flex gap-6 mb-2">
                    <h4 className="text-lg font-medium text-gray-700">
                      Payment Method:
                    </h4>
                    <p className="text-lg font-medium text-teal-500">
                      {paymentMethodType}
                    </p>
                  </div>

                  <div className="flex gap-6 mb-2">
                    <h4 className="text-lg font-medium text-gray-700">
                      Address:
                    </h4>
                    <p className="text-lg font-medium text-teal-500">
                      {shippingAddress?.city}
                    </p>{" "}
                  </div>

                  <div className="flex gap-6 mb-2">
                    <h4 className="text-lg font-medium text-gray-700">
                      Phone Number:
                    </h4>
                    <p className="text-lg font-medium text-teal-500">
                      {shippingAddress?.phone}
                    </p>{" "}
                  </div>

                  <div className="flex gap-6">
                    <h4 className="text-lg font-medium text-gray-700">
                      Total Order Price:
                    </h4>
                    <p className="text-lg font-bold text-teal-500">
                      {totalOrderPrice}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
          <p className="text-5xl font-medium">you did't make any orders yet</p>
          <Link
            to="/products"
            className="hover:bg-teal-700 focus:ring-teal-300 whitespace-nowrap w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
          >
            Go To Shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default Orders;
