import Loader from "@/components/Loader";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetProductDetailsQuery,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { productDetails, wishlist } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [filtered, setFiltered] = useState<string[]>([]);

  //todo: add product to cart call =>
  const [addToCart, { isLoading: addLoading }] = useAddToCartMutation();

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

  //todo: get product details by id call =>
  const { isError: productError, isLoading: productLoading } =
    useGetProductDetailsQuery(id!);

  //todo: add product to wishlist call =>
  const [addToWishlist] = useAddToWishlistMutation();

  const addToWishlistHandler = async (productId: string) => {
    try {
      await addToWishlist({ productId }).unwrap();

      toast.success("Product added successfully to your wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Product to your wishlist");
    }
  };

  //todo: remove product from wishlist call =>
  const [removeFromWishList] = useRemoveFromWishlistMutation();

  const removeFromWishListHandler = async (productId: string) => {
    try {
      await removeFromWishList({ productId }).unwrap();

      toast.success("Product removed successfully from your wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove Product from your wishlist");
    }
  };

  //todo: get user wishlist products call after adding and removing products =>
  const { isLoading: wishlistLoading } = useGetUserWishlistQuery();

  //todo: filter wishlist products =>
  useEffect(() => {
    const filteredId = wishlist.filter((item) => item === id);
    setFiltered(filteredId);
  }, [id, wishlist]);

  if (productLoading || addLoading || wishlistLoading) {
    return <Loader />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="px-8 py-12 mt-8">
      {productError && (
        <p className="my-12 text-4xl font-semibold text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {productDetails && (
        <div className="lg:flex-row flex flex-col items-center justify-center gap-20">
          <div className=" w-[400px]">
            <Slider {...sliderSettings}>
              {productDetails.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={productDetails.title} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="flex-1">
            <h3 className="mb-4 text-2xl font-semibold">
              {productDetails.title}
            </h3>
            <p className="mb-4 font-medium">{productDetails.description}</p>
            <h4 className="mb-4 text-lg font-medium text-teal-500">
              {productDetails.category.name}
            </h4>
            <div className="flex items-center justify-around mb-8">
              {productDetails.priceAfterDiscount ? (
                <div className="flex gap-4">
                  <h4 className="line-through">{productDetails.price} EGP</h4>
                  <h4>{productDetails.priceAfterDiscount} EGP</h4>
                </div>
              ) : (
                <h4>{productDetails.price} EGP</h4>
              )}
              <p className="flex items-center">
                <FaStar className="mr-1 text-yellow-400" size={16} />{" "}
                {productDetails.ratingsAverage}
              </p>

              <div className="cursor-pointer">
                {filtered.length > 0 ? (
                  filtered.map((i) => (
                    <FaHeart
                      size={30}
                      className="text-red-500"
                      onClick={() => removeFromWishListHandler(id!)}
                      key={i}
                    />
                  ))
                ) : (
                  <FaRegHeart
                    size={30}
                    className="text-red-500"
                    onClick={() => addToWishlistHandler(id!)}
                  />
                )}
              </div>
            </div>

            <button
              onClick={() => {
                addToCartHandler(id!);
              }}
              className="hover:bg-teal-700 focus:ring-teal-300 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-teal-500 rounded-lg cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
