import { BiSolidTrashAlt } from "react-icons/bi";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { selectCart, setNumOfItems, setUserCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import {
  useClearUserCartMutation,
  useGetUserCartQuery,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "@/store/cart/cartApi";

const Cart = () => {
  const { userCart } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  //todo: update quantity call =>
  const [updateQuantity] = useUpdateQuantityMutation();

  const updateQuantityHandler = async ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }) => {
    try {
      const data = await updateQuantity({
        productId,
        count,
      }).unwrap();
      dispatch(setUserCart(data));
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to updated Product");
    }
  };

  //todo: remove from cart call =>
  const [removeFromCart, { isLoading: removedLoading }] =
    useRemoveFromCartMutation();

  const removeFromCartHandler = async (productId: string) => {
    try {
      const data = await removeFromCart({ productId }).unwrap();
      dispatch(setUserCart(data));
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is removed successfully from your Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove Product from your Cart");
    }
  };

  //todo: clear all data from cart call =>
  const [clearUserCart, { isLoading: clearLoading }] =
    useClearUserCartMutation();

  const clearUserCartHandler = async () => {
    try {
      await clearUserCart();
      dispatch(setUserCart(null));
      dispatch(setNumOfItems(0));
      toast.success("Your Cart Is Cleared Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Clear your Cart");
    }
  };

  //todo: get user cart data call =>
  const { isError: getError, isLoading: getLoading } = useGetUserCartQuery();

  if (getLoading || removedLoading || clearLoading) {
    return <Loader />;
  }
  return (
    <section className="xl:mx-24 px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-500">
            Shopping Cart
          </h2>
        </div>

        <div>
          {userCart && (
            <button
              onClick={clearUserCartHandler}
              className="hover:bg-red-700 focus:ring-red-300 whitespace-nowrap w-fit px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-red-500 rounded-lg cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
      {userCart?.numOfCartItems! > 0 ? (
        <>
          <div className="sm:flex-row border-b-gray-300 sm:border-none flex flex-col items-center justify-between gap-8 pb-4 mb-4 text-2xl text-gray-500 border-b">
            <h3>
              Total Price:{" "}
              <span className="font-bold text-teal-500">
                {userCart?.data.totalCartPrice}
              </span>
            </h3>
            <h3>
              Total Number:{" "}
              <span className="font-semibold text-teal-500">
                {userCart?.numOfCartItems}
              </span>
            </h3>
          </div>

          {userCart?.data.products.map(({ _id, product, price, count }) => (
            <div
              style={{
                boxShadow:
                  "12px 12px 26px rgba(0, 0, 0, 0.2),-12px -12px 26px rgba(255, 255, 255, 0.6)",
              }}
              className="rounded-xl p-4 my-4"
              key={_id}
            >
              <div className="sm:flex-row flex flex-col items-center justify-between gap-8">
                <div className="flex items-center">
                  <img
                    className="w-28 mr-3"
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
                    <div
                      className="flex"
                      onClick={() => {
                        removeFromCartHandler(product.id);
                      }}
                    >
                      <BiSolidTrashAlt className="text-[20px] cursor-pointer text-1xl text-red-600 relative top-[2px] mr-1" />
                      <button className="text-red-600">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => {
                      updateQuantityHandler({
                        productId: product.id,
                        count: count + 1,
                      });
                    }}
                    className="sm:text-base hover:bg-teal-500 hover:text-white focus:ring-teal-300 px-4 py-2 text-sm text-gray-500 bg-transparent border-2 border-teal-500 rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                  <span className="mx-4 text-lg font-medium">{count}</span>
                  <button
                    onClick={() => {
                      if (count <= 1) {
                        removeFromCartHandler(product.id);
                      } else {
                        updateQuantityHandler({
                          productId: product.id,
                          count: count - 1,
                        });
                      }
                    }}
                    className="sm:text-base hover:bg-teal-500 focus:ring-teal-300 hover:text-white px-4 py-2 text-sm text-gray-500 bg-transparent border-2 border-teal-500 rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/checkout"
            className="hover:bg-teal-700 whitespace-nowrap focus:ring-teal-300 block w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
          >
            Checkout
          </Link>
        </>
      ) : userCart?.numOfCartItems === 0 || getError || !userCart ? (
        <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
          <p className="sm:text-5xl text-3xl font-medium">your Cart Is Empty</p>
          <Link
            to="/products"
            className="hover:bg-teal-700 focus:ring-teal-300 whitespace-nowrap w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
          >
            Go To Shopping
          </Link>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Cart;
