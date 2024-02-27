import { SignupFormValues } from "@/pages/Signup";
import { api } from "../api";
import { SigninFormValues } from "@/pages/Signin";
import { setToken, setUserId } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { ILogin } from "@/types";
import { ForgetPassFormValues } from "@/pages/ForgetPassword";
import { VerifyCodeFormValues } from "@/pages/VerifyCode";
import { ResetPassFormValues } from "@/pages/ResetPassword";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<void, SignupFormValues>({
      query: (values) => ({
        url: "api/v1/auth/signup",
        method: "POST",
        body: { ...values },
      }),
    }),

    signin: builder.mutation<ILogin, SigninFormValues>({
      query: (values) => ({
        url: "api/v1/auth/signin",
        method: "POST",
        body: { ...values },
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token } = data;

          dispatch(setToken(token));
          const { id } = jwtDecode<{
            id: string;
          }>(token);

          dispatch(setUserId(id));
        } catch (err) {
          console.log(err);
        }
      },

      invalidatesTags: ["Cart", "Wishlist"],
    }),

    forgetPass: builder.mutation<void, ForgetPassFormValues>({
      query: (values) => ({
        url: "api/v1/auth/forgotPasswords",
        method: "POST",
        body: { ...values },
      }),
    }),

    verifyCode: builder.mutation<void, VerifyCodeFormValues>({
      query: (values) => ({
        url: "api/v1/auth/verifyResetCode",
        method: "POST",
        body: { ...values },
      }),
    }),

    resetPass: builder.mutation<ILogin, ResetPassFormValues>({
      query: (values) => ({
        url: "api/v1/auth/resetPassword",
        method: "PUT",
        body: { ...values },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgetPassMutation,
  useVerifyCodeMutation,
  useResetPassMutation,
} = authApi;
