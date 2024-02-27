import Loader from "@/components/Loader";
import { useGetAllCategoriesQuery } from "@/store/cart/cartApi";
import { selectCart } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/redux-hooks";
import arrayShuffle from "array-shuffle";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories } = useAppSelector(selectCart);

  const { isLoading, isError } = useGetAllCategoriesQuery();

  const shuffleCategories = arrayShuffle(categories);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">
        Featured Categories
      </h2>
      {isError && (
        <p className="my-12 text-4xl font-semibold text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {shuffleCategories.length > 0 && (
        <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-16 cursor-pointer">
          {shuffleCategories.map(({ _id, image, name }) => (
            <div
              className="group rounded-xl pb-8"
              key={_id}
              style={{
                boxShadow:
                  "12px 12px 26px rgba(0, 0, 0, 0.2),-12px -12px 26px rgba(255, 255, 255, 0.6)",
              }}
            >
              <Link to="/products">
                <img
                  className="mx-auto h-[300px] w-full object-cover rounded-md"
                  src={image}
                  alt={name}
                />
                <p className="group-hover:text-teal-500 mt-8 text-xl font-semibold text-center text-gray-500 transition-all duration-300">
                  {name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
