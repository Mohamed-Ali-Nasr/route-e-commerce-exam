export interface ILogin {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export interface IProduct {
  id: string;
  category: { name: string };
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage: number;
  description: string;
  priceAfterDiscount: number;
  images: string[];
}

export interface IProductApi {
  data: IProduct[];
}

export interface IProductDetailsApi {
  data: IProduct;
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
}

export interface ICategoryApi {
  data: ICategory[];
}

export interface IUserCart {
  numOfCartItems: number;
  data: {
    _id: string;
    totalCartPrice: number;
    products: {
      _id: string;
      count: number;
      price: number;
      product: IProduct;
    }[];
  };
}

export interface IUserCartApi {
  data: IUserCart;
}

export interface IUserOrders {
  id: number;
  totalOrderPrice: number;
  shippingAddress: {
    city: string;
    phone: string;
  };
  paymentMethodType: string;
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: IProduct;
  }[];
}

export interface IUserWishlist {
  count: number;
  data: {
    id: string;
    imageCover: string;
    title: string;
    price: number;
  }[];
}

export interface IBrand {
  slug: string;
  name: string;
  image: string;
  _id: string;
}

export interface IBrandApi {
  data: IBrand[];
}

export interface IBrandDetailsApi {
  data: IBrand;
}
