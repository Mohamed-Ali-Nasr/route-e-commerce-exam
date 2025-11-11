import Loader from "./Loader";
import { useGetAllProductsQuery } from "@/store/cart/cartApi";
import { selectCart } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/redux-hooks";
import ProductItem from "./ProductItem";

const FeaturedProduct = () => {
  const { products } = useAppSelector(selectCart);

  const { isError: productsError, isLoading: productsLoading } =
    useGetAllProductsQuery();

  if (productsLoading) {
    return <Loader />;
  }

  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">
        popular Products
      </h2>

      {productsError && (
        <p className="my-12 text-4xl font-semibold text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {products.length > 0 && (
        <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 grid grid-cols-1 gap-16">
          {products.slice(0, 20).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProduct;
