import Loader from "@/components/Loader";
import {
  useAddToCartMutation,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { BiSolidTrashAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { userWishlist } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();

  const addToCartHandler = async (productId: string) => {
    try {
      const data = await addToCart({ productId }).unwrap();
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is added successfully to your Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Product to your Cart");
    }
  };

  const [removeFromWishList, { isLoading: removeWishlistLoading }] =
    useRemoveFromWishlistMutation();

  const removeFromWishListHandler = async (productId: string) => {
    try {
      await removeFromWishList({ productId }).unwrap();
      toast.success("Product removed successfully from your wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove Product from your wishlist");
    }
  };

  const { isFetching: getWishlistLoading } = useGetUserWishlistQuery();

  if (getWishlistLoading || removeWishlistLoading || addCartLoading) {
    return <Loader />;
  }

  return (
    <section className="xl:mx-24 px-4 py-12">
      <h2 className="mb-8 text-3xl font-semibold text-gray-500">
        Shopping Cart
      </h2>

      {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
      {userWishlist?.count! > 0 ? (
        <>
          {userWishlist?.data.map(({ id, imageCover, price, title }) => (
            <div
              style={{
                boxShadow:
                  "12px 12px 26px rgba(0, 0, 0, 0.2),-12px -12px 26px rgba(255, 255, 255, 0.6)",
              }}
              className="rounded-xl p-4 my-4"
              key={id}
            >
              <div className="sm:flex-row sm:items-center flex flex-col justify-between gap-8">
                <div className="flex items-center">
                  <img className="w-28 mr-3" src={imageCover} alt={title} />
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-500">
                      {title.split(" ").slice(0, 4).join(" ")}
                    </h3>
                    <h4 className="mb-2 font-bold text-teal-500">
                      {price} EGP
                    </h4>
                    <div
                      className="flex"
                      onClick={() => {
                        removeFromWishListHandler(id);
                      }}
                    >
                      <BiSolidTrashAlt className="text-[20px] cursor-pointer text-1xl text-red-600 relative top-[2px] mr-1" />
                      <button className="text-red-600">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="">
                  <button
                    onClick={() => {
                      addToCartHandler(id);
                    }}
                    className="hover:bg-teal-700 focus:ring-teal-300 whitespace-nowrap w-full px-4 py-2 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : userWishlist?.count === 0 || !userWishlist ? (
        <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
          <p className="text-5xl font-medium">your Wishlist Is Empty</p>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Wishlist;
