import Loader from "@/components/Loader";
import { useAppSelector } from "@/store/redux-hooks";
import { selectCart } from "@/store/cart/cartSlice";
import {
  useGetAllProductsQuery,
  useGetUserWishlistQuery,
} from "@/store/cart/cartApi";
import ProductItem from "@/components/ProductItem";

const Products = () => {
  const { products } = useAppSelector(selectCart);

  const { isLoading: wishlistLoading } = useGetUserWishlistQuery();

  const { isError: productsError, isLoading: productsLoading } =
    useGetAllProductsQuery();

  if (productsLoading || wishlistLoading) {
    return <Loader />;
  }

  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">All Products</h2>

      {productsError && (
        <p className="my-12 text-4xl font-semibold text-center text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {products.length > 0 && (
        <div className="md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:gap-16 grid grid-cols-1 gap-8">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
