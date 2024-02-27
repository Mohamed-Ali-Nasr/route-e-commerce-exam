import { selectAuth } from "@/store/auth/authSlice";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { IProduct } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

interface IProductProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductProps) => {
  const {
    category,
    id,
    imageCover,
    price,
    priceAfterDiscount,
    ratingsAverage,
    title,
  } = product;

  const { token } = useAppSelector(selectAuth);
  const { wishlist } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filtered, setFiltered] = useState<string[]>([]);

  const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();

  const addToCartHandler = async (productId: string) => {
    if (token) {
      try {
        const data = await addToCart({ productId }).unwrap();
        dispatch(setNumOfItems(data.numOfCartItems));
        toast.success("Product is added successfully to your Cart");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add Product to your Cart");
      }
    } else {
      navigate("/signin");
    }
  };

  const [addToWishlist, { isLoading: addWishlistLoading }] =
    useAddToWishlistMutation();

  const addToWishlistHandler = async (productId: string) => {
    if (token) {
      try {
        await addToWishlist({ productId }).unwrap();

        toast.success("Product added successfully to your wishlist");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add Product to your wishlist");
      }
    } else {
      navigate("/signin");
    }
  };

  const [removeFromWishList, { isLoading: removeWishlistLoading }] =
    useRemoveFromWishlistMutation();

  const removeFromWishListHandler = async (productId: string) => {
    if (token) {
      try {
        await removeFromWishList({ productId }).unwrap();

        toast.success("Product removed successfully from your wishlist");
      } catch (error) {
        console.log(error);
        toast.error("Failed to remove Product from your wishlist");
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const filteredId = wishlist.filter((item) => item === id);
    setFiltered(filteredId);
  }, [id, wishlist]);

  if (addCartLoading || addWishlistLoading || removeWishlistLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        boxShadow:
          "12px 12px 26px rgba(0, 0, 0, 0.2),-12px -12px 26px rgba(255, 255, 255, 0.6)",
      }}
      className="group rounded-xl p-4"
    >
      <Link to={`/products/${id}`}>
        <img src={imageCover} alt={title} />
        <h3 className="mt-8 text-lg font-medium text-teal-500">
          {category.name}
        </h3>
        <p className="mb-4 font-semibold">
          {title.split(" ").slice(0, 4).join(" ")}
        </p>
        <div className="flex items-center justify-between">
          {priceAfterDiscount ? (
            <div className="flex gap-4">
              <h4 className="line-through">{price} EGP</h4>
              <h4>{priceAfterDiscount} EGP</h4>
            </div>
          ) : (
            <h4>{price} EGP</h4>
          )}
          <p className="flex items-center">
            <FaStar className="mr-1 text-yellow-400" size={16} />
            {ratingsAverage}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => {
            addToCartHandler(id);
          }}
          className="hover:bg-teal-700 focus:ring-teal-300 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 translate-y-full bg-teal-500 rounded-lg opacity-0 cursor-pointer"
        >
          Add to Cart
        </button>

        <div className="flex-1 cursor-pointer">
          {filtered.length > 0 ? (
            filtered.map((i) => (
              <FaHeart
                size={30}
                className="text-red-500"
                onClick={() => removeFromWishListHandler(id)}
                key={i}
              />
            ))
          ) : (
            <FaRegHeart
              size={30}
              className="text-red-500"
              onClick={() => addToWishlistHandler(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
