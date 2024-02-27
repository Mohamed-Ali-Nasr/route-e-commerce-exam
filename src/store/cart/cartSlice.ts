import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  IBrand,
  ICategory,
  IProduct,
  IUserCart,
  IUserOrders,
  IUserWishlist,
} from "@/types";

interface CartSlice {
  products: IProduct[];
  categories: ICategory[];
  brands: IBrand[];
  productDetails: IProduct | null;
  numOfItems: number;
  userCart: IUserCart | null;
  cartId: string | null;
  userOrders: IUserOrders[];
  wishlist: string[];
  userWishlist: IUserWishlist | null;
  countWishlist: number;
  brandDetails: IBrand | null;
}

const initialState: CartSlice = {
  products: [],
  categories: [],
  brands: [],
  productDetails: null,
  numOfItems: 0,
  userCart: null,
  cartId: null,
  userOrders: [],
  wishlist: [],
  userWishlist: null,
  countWishlist: 0,
  brandDetails: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },

    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },

    setBrands: (state, action: PayloadAction<IBrand[]>) => {
      state.brands = action.payload;
    },

    setProductDetails: (state, action: PayloadAction<IProduct | null>) => {
      state.productDetails = action.payload;
    },

    setNumOfItems: (state, action: PayloadAction<number>) => {
      state.numOfItems = action.payload;
    },

    setUserCart: (state, action: PayloadAction<IUserCart | null>) => {
      state.userCart = action.payload;
    },

    setCartId: (state, action: PayloadAction<string | null>) => {
      state.cartId = action.payload;
    },

    setUserOrders: (state, action: PayloadAction<IUserOrders[]>) => {
      state.userOrders = action.payload;
    },

    setWishList: (state, action: PayloadAction<string[]>) => {
      state.wishlist = action.payload;
    },

    setUserWishlist: (state, action: PayloadAction<IUserWishlist | null>) => {
      state.userWishlist = action.payload;
    },

    setCountWishlist: (state, action: PayloadAction<number>) => {
      state.countWishlist = action.payload;
    },

    setBrandDetails: (state, action: PayloadAction<IBrand | null>) => {
      state.brandDetails = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const {
  setProducts,
  setCategories,
  setProductDetails,
  setNumOfItems,
  setUserCart,
  setCartId,
  setUserOrders,
  setWishList,
  setUserWishlist,
  setCountWishlist,
  setBrands,
  setBrandDetails,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
