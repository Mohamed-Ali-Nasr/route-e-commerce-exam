import Loader from "@/components/Loader";
import {
  useGetAllBrandsQuery,
  useGetBrandDetailsMutation,
} from "@/store/cart/cartApi";
import { selectCart } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/redux-hooks";
import arrayShuffle from "array-shuffle";
import { useState } from "react";

const Brands = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { brands, brandDetails } = useAppSelector(selectCart);

  //todo: get brand details call =>
  const [getBrandsDetails, { isLoading: brandsDetailsLoading }] =
    useGetBrandDetailsMutation();

  const getBrandsDetailsHandler = async (brandId: string) => {
    try {
      await getBrandsDetails(brandId);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  //todo: get all brands call =>
  const { isLoading: allBrandsLoading, isError } = useGetAllBrandsQuery();

  const shuffleProducts = arrayShuffle(brands);

  if (allBrandsLoading || brandsDetailsLoading) {
    return <Loader />;
  }

  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">All Brands</h2>

      {isError && (
        <p className="my-12 text-4xl font-semibold text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {shuffleProducts.length > 0 && (
        <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-16 grid grid-cols-1 gap-8">
          {shuffleProducts.map(({ _id, image, name }) => (
            <div
              style={{
                boxShadow:
                  "12px 12px 26px rgba(0, 0, 0, 0.2),-12px -12px 26px rgba(255, 255, 255, 0.6)",
              }}
              className="group rounded-xl p-4 cursor-pointer"
              key={_id}
              onClick={() => {
                getBrandsDetailsHandler(_id);
              }}
            >
              <img src={image} alt={name} />
              <h3 className="mt-8 text-xl font-medium text-teal-500">{name}</h3>
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
                    {brandDetails?.name}
                  </p>
                  <h4 className="mt-3 text-lg font-medium text-gray-500">
                    {brandDetails?.slug}
                  </h4>
                </div>

                <div>
                  <img src={brandDetails?.image} alt={brandDetails?.name} />
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

export default Brands;
