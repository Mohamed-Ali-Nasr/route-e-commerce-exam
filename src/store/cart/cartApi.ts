import {
  IBrandApi,
  IBrandDetailsApi,
  ICategoryApi,
  ICategoryDetailsApi,
  IProductApi,
  IProductDetailsApi,
  IUserCart,
  IUserOrders,
  IUserWishlist,
} from "@/types";
import { api } from "../api";
import {
  setBrandDetails,
  setBrands,
  setCartId,
  setCategories,
  setCategoryDetails,
  setCountWishlist,
  setNumOfItems,
  setProductDetails,
  setProducts,
  setUserCart,
  setUserOrders,
  setUserWishlist,
  setWishList,
} from "./cartSlice";
import { CheckoutFormValues } from "@/pages/Checkout";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategoryApi, void>({
      query: () => ({
        url: "api/v1/categories",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: categoriesData } = data;
          dispatch(setCategories(categoriesData));
        } catch (err) {
          console.log(err);
          dispatch(setCategories([]));
        }
      },
    }),

    getAllProducts: builder.query<IProductApi, void>({
      query: () => ({
        url: "api/v1/products",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: productsData } = data;
          dispatch(setProducts(productsData));
        } catch (err) {
          console.log(err);
          dispatch(setProducts([]));
        }
      },
    }),

    getAllBrands: builder.query<IBrandApi, void>({
      query: () => ({
        url: "api/v1/brands",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: brandsData } = data;
          dispatch(setBrands(brandsData));
        } catch (err) {
          console.log(err);
          dispatch(setBrands([]));
        }
      },
    }),

    getCategoryDetails: builder.mutation<ICategoryDetailsApi, string>({
      query: (categoryId) => ({
        url: `api/v1/categories/${categoryId}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: categoryData } = data;
          dispatch(setCategoryDetails(categoryData));
        } catch (err) {
          console.log(err);
          dispatch(setCategoryDetails(null));
        }
      },
    }),

    getBrandDetails: builder.mutation<IBrandDetailsApi, string>({
      query: (brandId) => ({
        url: `api/v1/brands/${brandId}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: brandData } = data;
          dispatch(setBrandDetails(brandData));
        } catch (err) {
          console.log(err);
          dispatch(setBrandDetails(null));
        }
      },
    }),

    getProductDetails: builder.query<IProductDetailsApi, string>({
      query: (productId) => ({
        url: `api/v1/products/${productId}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: productData } = data;
          dispatch(setProductDetails(productData));
        } catch (err) {
          console.log(err);
          dispatch(setProductDetails(null));
        }
      },
    }),

    getUserCart: builder.query<IUserCart, void>({
      query: () => ({
        url: "api/v1/cart",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserCart(data));
          dispatch(setNumOfItems(data.numOfCartItems));
          dispatch(setCartId(data.data._id));
        } catch (err) {
          console.log(err);
          dispatch(setUserCart(null));
          dispatch(setNumOfItems(0));
          dispatch(setCartId(null));
        }
      },

      providesTags: ["Cart"],
    }),

    getUserOrders: builder.query<IUserOrders[], string>({
      query: (userId) => ({
        url: `api/v1/orders/user/${userId}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserOrders(data));
        } catch (err) {
          console.log(err);
          dispatch(setUserOrders([]));
        }
      },

      providesTags: ["Orders"],
    }),

    getUserWishlist: builder.query<IUserWishlist, void>({
      query: () => ({
        url: "api/v1/wishlist",
        method: "GET",
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserWishlist(data));
          dispatch(setCountWishlist(data.count));
        } catch (err) {
          console.log(err);
          dispatch(setUserWishlist(null));
          dispatch(setCountWishlist(0));
        }
      },

      providesTags: ["Wishlist"],
    }),

    addToCart: builder.mutation<IUserCart, { productId: string }>({
      query: (body: { productId: string }) => ({
        url: "api/v1/cart",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<IUserCart, { productId: string }>({
      query: (body: { productId: string }) => ({
        url: `api/v1/cart/${body.productId}`,
        method: "DELETE",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    clearUserCart: builder.mutation<void, void>({
      query: () => ({
        url: "api/v1/cart",
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

    updateQuantity: builder.mutation<
      IUserCart,
      { productId: string; count: number }
    >({
      query: (body: { productId: string; count: number }) => ({
        url: `api/v1/cart/${body.productId}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    cashPayment: builder.mutation<
      void,
      { cartId: string; values: CheckoutFormValues }
    >({
      query: (body: { cartId: string; values: CheckoutFormValues }) => ({
        url: `api/v1/orders/${body.cartId}`,
        method: "POST",
        body: { shippingAddress: body.values },
      }),

      invalidatesTags: ["Orders", "Cart"],
    }),

    onlinePayment: builder.mutation<
      void,
      { cartId: string; values: CheckoutFormValues }
    >({
      query: (body: { cartId: string; values: CheckoutFormValues }) => ({
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${
          body.cartId
        }?url=${import.meta.env.VITE_BASE_URL}`,
        method: "POST",
        body: { shippingAddress: body.values },
      }),

      invalidatesTags: ["Orders", "Cart"],
    }),

    addToWishlist: builder.mutation<{ data: string[] }, { productId: string }>({
      query: (body: { productId: string }) => ({
        url: "api/v1/wishlist",
        method: "POST",
        body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: wishlistData } = data;
          dispatch(setWishList(wishlistData));
        } catch (err) {
          console.log(err);
          dispatch(setWishList([]));
        }
      },

      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<
      { data: string[] },
      { productId: string }
    >({
      query: (body: { productId: string }) => ({
        url: `api/v1/wishlist/${body.productId}`,
        method: "DELETE",
        body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: wishlistData } = data;
          dispatch(setWishList(wishlistData));
        } catch (err) {
          console.log(err);
          dispatch(setWishList([]));
        }
      },

      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetAllBrandsQuery,
  useGetCategoryDetailsMutation,
  useGetBrandDetailsMutation,
  useGetProductDetailsQuery,
  useGetUserCartQuery,
  useGetUserOrdersQuery,
  useGetUserWishlistQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearUserCartMutation,
  useUpdateQuantityMutation,
  useCashPaymentMutation,
  useOnlinePaymentMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = cartApi;
