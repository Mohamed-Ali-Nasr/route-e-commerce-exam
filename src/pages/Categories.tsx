import Loader from "@/components/Loader";
import {
  useGetAllCategoriesQuery,
  useGetCategoryDetailsMutation,
} from "@/store/cart/cartApi";
import { selectCart } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/redux-hooks";
import { useState } from "react";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, categoryDetails } = useAppSelector(selectCart);

  //todo: get category details call =>
  const [getCategoryDetails] = useGetCategoryDetailsMutation();

  const getCategoryDetailsHandler = async (categoryId: string) => {
    try {
      await getCategoryDetails(categoryId);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  //todo: get all categories call =>
  const { isLoading, isError } = useGetAllCategoriesQuery();

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

      {categories.length > 0 && (
        <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-16 cursor-pointer">
          {categories.map(({ _id, image, name }) => (
            <div
              className="group rounded-xl pb-8"
              key={_id}
              style={{
                boxShadow:
                  "3px 3px 8px rgba(0, 0, 0, 0.2),-12px -12px 8px rgba(255, 255, 255, 0.6)",
              }}
              onClick={() => getCategoryDetailsHandler(_id)}
            >
              <img
                className="mx-auto h-[300px] w-full object-cover rounded-md"
                src={image}
                alt={name}
              />
              <p className="group-hover:text-teal-500 mt-8 text-xl font-semibold text-center text-gray-500 transition-all duration-300">
                {name}
              </p>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-opacity-40 md:inset-0 fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen max-h-full overflow-hidden bg-black"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-full p-4"
          >
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-3 border-b rounded-t">
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-gray-200 hover:text-gray-900 ms-auto inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between gap-12 p-4 space-y-4">
                <div className="pl-2 mt-8">
                  <p className="sm:text-5xl text-3xl font-semibold text-teal-500">
                    {categoryDetails?.name}
                  </p>
                  <h4 className="mt-3 text-lg font-medium text-gray-500">
                    {categoryDetails?.slug}
                  </h4>
                </div>

                <div>
                  <img
                    className="mx-auto h-[300px] w-full object-cover rounded-md"
                    src={categoryDetails?.image}
                    alt={categoryDetails?.name}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;
